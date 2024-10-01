import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  songs: [],
  song: {},
  artistSongs: [],
  currentPage: 1,
  totalPages: 1,
  cachedSongsByPage: {}
};

const mutations = {
  SET_SONGS: (state, songs) => state.songs = songs,
  SET_SONG: (state, song) => state.song = song,
  SET_ARTIST_SONGS: (state, songs) => state.artistSongs = songs,
  SET_CURRENT_PAGE: (state, page) => state.currentPage = page,
  SET_TOTAL_PAGES: (state, totalPages) => state.totalPages = totalPages,
  SET_CACHED_SONGS_BY_PAGE: (state, { page, songs }) => {
    state.cachedSongsByPage[page] = songs;
  },
};

async function processSongs(songs, dispatch) {
  const promises = songs.map(song => {
    const artistNames = song.songArtists.map(artist => artist.Artist.name).join(' & ');
    return dispatch('fetchReleaseId', { title: song.name, artist: artistNames })
      .then(releaseId => {
        return dispatch('fetchCoverImage', releaseId)
          .then(coverImageUrl => {
            song.cover = coverImageUrl;
            return dispatch('fetchAverageRating', song.id)
              .then(averageRating => {
                song.averageRating = averageRating;
                return song;
              });
          });
      });
  });
  return Promise.all(promises);
}

const actions = {
  async fetchTotalSongs({ dispatch }) {
    try {
      const response = await makeApiRequest('/api/song/count', null, 'GET');
      const totalSongs = response.data.total;
      dispatch('setTotalPages', totalSongs);
    } catch (err) {
      console.error('Error fetching total songs:', err);
    }
  },
  setTotalPages({ commit }, totalSongs) {
    const limit = 6;
    const totalPages = Math.ceil(totalSongs / limit);
    commit('SET_TOTAL_PAGES', totalPages);
  },

  // Fetch all songs
  fetchAllSongs({ commit, dispatch, state }, { page = 1 } = {}) {
    if (state.cachedSongsByPage[page]) {
      commit('SET_SONGS', state.cachedSongsByPage[page]);
      commit('SET_CURRENT_PAGE', page);
      return Promise.resolve(state.cachedSongsByPage[page]);
    }

    const limit = 6;
    const offset = (page - 1) * limit;
    return makeApiRequest(`/api/song/full?limit=${limit}&offset=${offset}`, null, 'GET')
      .then(resp => {
        return processSongs(resp.data.songs, dispatch)
          .then(updatedSongs => {
            commit('SET_CACHED_SONGS_BY_PAGE', { page, songs: updatedSongs });
            commit('SET_SONGS', updatedSongs);
            commit('SET_CURRENT_PAGE', page);
            return updatedSongs;
          });
      })
      .catch(err => console.error(err));
  },
  async fetchSongById({ commit, dispatch }, songId) {
    try {
      const resp = await makeApiRequest(`/api/song/full/${songId}`, null, 'GET');
      const song = await processSongs([resp.data], dispatch);
      commit('SET_SONG', song[0]);
      return song[0];
    } catch (err) {
      console.error(err);
    }
  },
  // Fetch all songs by ArtistId
  fetchSongsByArtistId({ commit, dispatch }, artistId) {
    return makeApiRequest(`/api/song/full-artist/${artistId}`, null, 'GET')
      .then(resp => processSongs(resp.data, dispatch))
      .then(updatedSongs => {
        commit('SET_ARTIST_SONGS', updatedSongs);
        return updatedSongs;
      })
      .catch(() => {});
  },
  // Fetch release ID
  async fetchReleaseId({ commit }, { title, artist }) {
    try {
      const resp = await axios({
        url: `https://cors-anywhere.herokuapp.com/https://musicbrainz.org/ws/2/release/?query=release:"${title}" AND artist:"${artist}"`,
        method: 'GET'
      });
      const releases = resp.data.releases;
      if (releases.length === 0) {
        return Promise.reject(new Error('No release found'));
      }
      return releases.slice(0, 5)
        .map(release => release.id);
    } catch (err) {}
  },
  // Fetch cover image
  async fetchCoverImage({ commit }, releaseIds) {
    const defaultImageUrl = '../../assets/default_cover.jpg';

    function convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    for (const releaseId of releaseIds) {
      try {
        const cachedImageResponse = await axios.get(`/api/redis/images/${releaseId}`);
        if (cachedImageResponse.data) {
          // Base64 payload from Redis
          return cachedImageResponse.data;
        }
      } catch (err) {
        console.warn(`Image not found in cache for releaseId: ${releaseId}. Fetching from external source.`);
      }

      try {
        const resp = await axios({
          url: `https://cors-anywhere.herokuapp.com/https://coverartarchive.org/release/${releaseId}/front`,
          method: 'GET',
          responseType: 'blob',
        });

        const blob = new Blob([resp.data], { type: resp.headers['content-type'] });
        const base64Image = await convertBlobToBase64(blob);

        try {
          await axios.post(`/api/redis/images/${releaseId}`, { base64: base64Image });
        } catch (cacheErr) {
          console.error('Error saving image to cache:', cacheErr);
        }

        return base64Image;
      } catch (err) {
        console.error('Error fetching cover image from external source:', err);
      }
    }
    return defaultImageUrl;
  },

  async fetchAverageRating({ commit }, songId) {
    try {
      const response = await makeApiRequest(`/api/song-rating/average/${songId}`, null, 'GET');
      return response.data;
    } catch (err) {}
  }
};

const getters = {
  songs: state => state.songs,
  song: state => state.song,
  artistSongs: state => state.artistSongs,
  currentPage: state => state.currentPage,
  totalPages: state => state.totalPages,
  getSongById: state => id => state.songs.find(song => song.id === id),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
