import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  songs: [],
};

const mutations = {
  SET_SONGS: (state, songs) => state.songs = songs
};

const actions = {
  // Fetch all songs
  fetchSongs({ commit, dispatch }) {
    return makeApiRequest(`/api/song/full`, null, 'GET')
      .then(resp => {
        const songs = resp.data;
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
        return Promise.all(promises).then(updatedSongs => {
          commit('SET_SONGS', updatedSongs);
          return resp;
        });
      })
      .catch(err => {
        throw err;
      });
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
      return releases[0].id || releases[1].id;
    } catch (err) {
      throw err;
    }
  },
  // Fetch cover image
  async fetchCoverImage({ commit }, releaseId) {
    try {
      const resp = await axios({
        url: `https://cors-anywhere.herokuapp.com/https://coverartarchive.org/release/${releaseId}/front`,
        method: 'GET',
        responseType: 'blob',
      });
      const blob = new Blob([resp.data], { type: resp.headers['content-type'] });
      return URL.createObjectURL(blob);
    } catch (err) {
      throw err;
    }
  },
};

const getters = {
  songs: state => state.songs,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
