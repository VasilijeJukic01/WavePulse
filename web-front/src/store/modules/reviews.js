import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  songReviews: [],
};

const mutations = {
  SET_SONG_REVIEWS(state, reviews) {
    state.songReviews = reviews;
  },
  ADD_SONG_REVIEW(state, review) {
    state.songReviews.push(review);
  },
  UPDATE_SONG_REVIEW(state, updatedReview) {
    const index = state.songReviews.findIndex(review => review.id === updatedReview.id);
    if (index !== -1) {
      state.songReviews.splice(index, 1, updatedReview);
    }
  },
  DELETE_SONG_REVIEW(state, reviewId) {
    state.songReviews = state.songReviews.filter(review => review.id !== reviewId);
  },
};

const actions = {
  async fetchSongReviews({ commit }, songId) {
    try {
      const response = await makeApiRequest(`/api/song-review/song/${songId}`, null, 'GET');
      commit('SET_SONG_REVIEWS', response.data);
    } catch (error) {
      console.error("Error fetching song reviews:", error);
    }
  },
  async createSongReview({ commit }, reviewData) {
    try {
      const response = await makeApiRequest('/api/song-review', reviewData, 'POST');
      commit('ADD_SONG_REVIEW', response.data);
    } catch (error) {
      console.error("Error creating song review:", error);
    }
  },
  async updateSongReview({ commit }, { id, likes, dislikes }) {
    try {
      const response = await makeApiRequest(`/api/song-review/${id}`, { likes, dislikes }, 'PUT');
      commit('UPDATE_SONG_REVIEW', response.data);
    } catch (error) {
      console.error("Error updating song review:", error);
    }
  },
  async deleteSongReview({ commit }, id) {
    try {
      await makeApiRequest(`/api/song-review/${id}`, null, 'DELETE');
      commit('DELETE_SONG_REVIEW', id);
    } catch (error) {
      console.error("Error deleting song review:", error);
    }
  },
};

const getters = {
  songReviews: state => state.songReviews,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
