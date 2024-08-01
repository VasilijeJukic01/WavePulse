import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  settings: {
    language: '',
    theme: '',
  },
};

const mutations = {
  SET_SETTINGS: (state, settings) => state.settings = settings,
};

const actions = {
  async fetchSettings({ commit }, id) {
    const response = await makeApiRequest(`/api/usersettings/${id}`, null, 'GET');
    commit('SET_SETTINGS', response.data);
  },
  async updateSettings({ commit }, settings) {
    await makeApiRequest(`/api/usersettings/${settings.userId}`, settings, 'PUT');
    commit('SET_SETTINGS', settings);
  }
};

const getters = {
  settings: state => state.settings,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
