import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  artist : {},
  countries: [],
  artistRatings: [],
};

const mutations = {
  SET_ARTIST(state, artist) {
    state.artist = artist;
  },
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_ARTIST_RATINGS(state, ratings) {
    state.artistRatings = ratings;
  },
};

const actions = {
  async fetchCountries({ commit }) {
    try {
      const response = await makeApiRequest('/api/country', null, 'GET');
      commit('SET_COUNTRIES', response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  },
  async fetchArtistByUserId({ commit }, userId) {
    try {
      const response = await makeApiRequest(`/api/artist/user/${userId}`, null, 'GET');
      commit('SET_ARTIST', response.data);
    } catch (error) {
      console.error("Error fetching artist by user id:", error);
    }
  },
  async editArtist({ commit }, artist) {
    try {
      const response = await makeApiRequest(`/api/artist/${artist.id}`, artist, 'PUT');
      commit('SET_ARTIST', response.data);
    } catch (error) {
      console.error("Error editing artist:", error);
    }
  },
  async fetchArtistRatings({ commit }, artistId) {
    try {
      const response = await makeApiRequest(`/api/artist/ratings/${artistId}`, null, 'GET');
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
  artist: (state) => state.artist,
  countries: (state) => state.countries,

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
