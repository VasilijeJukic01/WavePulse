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
      // TODO: Set artistId to 1 for now, as we only have one artist in the database
      const response = await makeApiRequest(`/api/artist/ratings/${1}`, null, 'GET');
      const formattedData = response.data.map(item => ({
        song: item.song,
        ratings: item.ratings
      }));
      commit('SET_ARTIST_RATINGS', formattedData);
    } catch (error) {
      console.error("Error fetching artist ratings:", error);
    }
  },
};

const getters = {
  averageRatingsBySong: (state) => {
    const songRatings = {};

    state.artistRatings.forEach((item) => {
      const songId = item.song.id;
      if (!songRatings[songId]) {
        songRatings[songId] = { total: 0, count: 0, name: item.song.name };
      }
      item.ratings.forEach(rating => {
        songRatings[songId].total += rating.rate;
        songRatings[songId].count += 1;
      });
    });

    return Object.entries(songRatings).map(([songId, { total, count, name }]) => ({
      songId,
      averageRating: total / count,
      name
    }));
  },
  ratingsOverTime: (state) => {
    const ratingsByDate = {};

    state.artistRatings.forEach((item) => {
      item.ratings.forEach(rating => {
        const date = new Date(rating.updatedAt).toLocaleDateString();
        if (!ratingsByDate[date]) {
          ratingsByDate[date] = [];
        }
        ratingsByDate[date].push(rating.rate);
      });
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
