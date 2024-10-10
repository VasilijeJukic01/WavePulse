import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  songs: [],
  filteredSongs: [],
  song: {},
  artistSongs: [],
  currentPage: 1,
  totalPages: 1,
  cachedSongsByPage: {}
};

const mutations = {
  SET_SONGS: (state, songs) => state.songs = songs,
  SET_FILTERED_SONGS: (state, songs) => state.filteredSongs = songs,
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
    return dispatch('fetchCoverImage', song.id)
      .then(coverImageUrl => {
        song.cover = coverImageUrl;
        return dispatch('fetchAverageRating', song.id)
          .then(averageRating => {
            song.averageRating = averageRating;
            return song;
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
  // Fetch cover image
  async fetchCoverImage({ commit }, songId) {
    function convertBlobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    try {
      // Cache Hit
      const cachedImageResponse = await axios.get(`/api/redis/images/${songId}`);
      if (cachedImageResponse.data) {
        return cachedImageResponse.data;
      }
    } catch (err) { }

    try {
      // Cache Miss
      const bucketName = process.env.VUE_APP_AWS_S3_BUCKET_NAME;
      const region = process.env.VUE_APP_AWS_REGION;
      const imageUrl = `https://${bucketName}.s3.${region}.amazonaws.com/covers/${songId}.jpg`;

      const response = await fetch(imageUrl, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Accept': 'image/jpeg'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const base64Image = await convertBlobToBase64(blob);

      // Cache the image in Redis
      try {
        await axios.post(`/api/redis/images/${songId}`, { base64: base64Image });
      } catch (err) { }

      return base64Image;
    } catch (err) {
      return null;
    }
  },

  async fetchAverageRating({ commit }, songId) {
    try {
      const response = await makeApiRequest(`/api/song-rating/average/${songId}`, null, 'GET');
      return response.data;
    } catch (err) {}
  },

  async fetchUserRating({ rootState }, { songId, userId }) {
    try {
      const response = await makeApiRequest(`/api/song-rating/rating?userId=${userId}&songId=${songId}`, null, 'GET');
      return response.data;
    } catch (err) {
      console.error('Failed to fetch user rating:', err);
      return null;
    }
  },

  async rateSong({ dispatch, rootState, commit }, { songId, rating }) {
    try {
      const userId = rootState.user.user.id;

      const existingRatingResponse = await makeApiRequest(`/api/song-rating/rating?userId=${userId}&songId=${songId}`, null, 'GET');
      const existingRating = existingRatingResponse.data;

      if (existingRating) {
        await makeApiRequest(`/api/song-rating/${existingRating.id}`, { rate: rating }, 'PUT');
      } else {
        await makeApiRequest('/api/song-rating', { songId, rate: rating, userId }, 'POST');
      }

      const updatedSong = await dispatch('fetchSongById', songId);
      const newAverageRating = await dispatch('fetchAverageRating', songId);

      commit('SET_SONG', { ...updatedSong, averageRating: newAverageRating });
    } catch (err) {
      console.error('Failed to submit rating:', err);
    }
  },

  async searchSongs({ commit, dispatch }, query) {
    if (!query.trim()) {
      commit('SET_FILTERED_SONGS', []);
      return;
    }

    try {
      const response = await makeApiRequest(`/api/song/search?query=${encodeURIComponent(query)}`, null, 'GET');

      const songs = await Promise.all(response.data.map(async song => {
        const averageRating = await dispatch('fetchAverageRating', song.id);
        const coverImage = await dispatch('fetchCoverImage', song.id);
        return {
          ...song,
          joinedGenres: song.songGenres.map(genre => genre.Genre.name).join(', '),
          joinedArtists: song.songArtists.map(artist => artist.Artist.name).join(', '),
          averageRating: averageRating,
          cover: coverImage
        };
      }));

      commit('SET_FILTERED_SONGS', songs);
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  }
};

const getters = {
  songs: state => state.songs,
  filteredSongs: state => state.filteredSongs,
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
