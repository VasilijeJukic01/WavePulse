import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  songs: [],
  artistSongs: [],
  currentPage: 1,
  totalPages: 1,
  cachedSongsByPage: {}
};

const mutations = {
  SET_SONGS: (state, songs) => state.songs = songs,
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
            return song;
          });
      });
  });
  return Promise.all(promises);
}

const actions = {
  // Fetch all songs
  fetchAllSongs({ commit, dispatch }, { page = 1 } = {}) {
    if (state.cachedSongsByPage[page]) {
      commit('SET_SONGS', state.cachedSongsByPage[page]);
      commit('SET_CURRENT_PAGE', page);
      return Promise.resolve(state.cachedSongsByPage[page]);
    }

    const limit = 6;
    const offset = (page - 1) * limit;
    return makeApiRequest(`/api/song/full?limit=${limit}&offset=${offset}`, null, 'GET')
      .then(resp => {
        const totalSongs = resp.data.total;
        return processSongs(resp.data.songs, dispatch)
          .then(updatedSongs => {
            commit('SET_CACHED_SONGS_BY_PAGE', { page, songs: updatedSongs });
            commit('SET_SONGS', updatedSongs);
            commit('SET_CURRENT_PAGE', page);
            commit('SET_TOTAL_PAGES', Math.ceil(totalSongs / limit) - 1);
            console.log(updatedSongs);
            return updatedSongs;
          });
      })
      .catch(() => {});
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

  async fetchCoverImage({ commit }, releaseIds) {
    const defaultImageUrl = 'path/to/default/image.jpg';
    for (const releaseId of releaseIds) {
      try {
        const resp = await axios({
          url: `https://cors-anywhere.herokuapp.com/https://coverartarchive.org/release/${releaseId}/front`,
          method: 'GET',
          responseType: 'blob',
        });
        const blob = new Blob([resp.data], { type: resp.headers['content-type'] });
        return URL.createObjectURL(blob);
      } catch (err) {}
    }
    return defaultImageUrl;
  },
};

const getters = {
  songs: state => state.songs,
  artistSongs: state => state.artistSongs,
  currentPage: state => state.currentPage,
  totalPages: state => state.totalPages,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
