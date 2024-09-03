import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  artistRatings: [],
};

const mutations = {
  SET_ARTIST_RATINGS(state, ratings) {
    state.artistRatings = ratings;
  },
};

const actions = {
  async fetchArtistRatings({ commit }, artistId) {
    try {
      const response = await axios.get(`/api/artist/ratings/${artistId}`);
      commit('SET_ARTIST_RATINGS', response.data);
    } catch (error) {
      console.error("Error fetching artist ratings:", error);
    }
  },
};

const getters = {
  averageRatingsBySong: (state) => {
    const songRatings = {};

    state.artistRatings.forEach((rating) => {
      const songId = rating.songId;
      if (!songRatings[songId]) {
        songRatings[songId] = { total: 0, count: 0 };
      }
      songRatings[songId].total += rating.rate;
      songRatings[songId].count += 1;
    });

    return Object.entries(songRatings).map(([songId, { total, count }]) => ({
      songId,
      averageRating: total / count,
    }));
  },
  ratingsOverTime: (state) => {
    const ratingsByDate = {};

    state.artistRatings.forEach((rating) => {
      const date = new Date(rating.updatedAt).toLocaleDateString();
      if (!ratingsByDate[date]) {
        ratingsByDate[date] = [];
      }
      ratingsByDate[date].push(rating.rate);
    });

    return Object.entries(ratingsByDate).map(([date, ratings]) => ({
      date,
      averageRating: ratings.reduce((acc, rate) => acc + rate, 0) / ratings.length,
    }));
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
