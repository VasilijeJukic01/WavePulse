import axios from 'axios';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  accounts: [],
};

const mutations = {
  SET_ACCOUNT: (state, accounts) => state.accounts = accounts,
  REMOVE_ACCOUNT: (state, id) => state.accounts = state.accounts.filter(account => account.id !== id),
};

const actions = {
  // Fetch all accounts
  fetchAccounts({ commit }) {
    return makeApiRequest('/auth/admin/account', null, 'GET')
      .then(resp => {
        commit('SET_ACCOUNT', resp.data);
        return resp;
      })
      .catch(err => {
        throw err;
      });
  },
  // Fetch account info
  fetchAccount({ commit }, id) {
    return makeApiRequest(`/auth/admin/account/${id}`, null, 'GET')
      .then(resp => {
        return resp;
      })
      .catch(err => {
        throw err;
      });
  },
  // Update account
  updateAccount({ commit }, payload) {
    return makeApiRequest(`/auth/admin/account/${payload.id}`, payload, 'PUT')
      .then(resp => {
        return resp;
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data.error || 'An error occurred');
        } else {
          throw err;
        }
      });
  },
  updatePassword({ commit }, payload) {
    return makeApiRequest(`/auth/admin/account/password/${payload.id}`, payload, 'PUT')
      .then(resp => {
        return resp;
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data.error || 'An error occurred');
        } else {
          throw err;
        }
      });
  },
  updateStatus({ commit }, payload) {
    return makeApiRequest(`/auth/admin/account/status/${payload.id}`, payload, 'PUT')
      .then(resp => {
        return resp;
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data.error || 'An error occurred');
        } else {
          throw err;
        }
      });
  },
  // Delete account
  deleteAccount({ commit }, id) {
    return makeApiRequest(`/auth/admin/account/${id}`, null, 'DELETE')
      .then(resp => {
        commit('REMOVE_ACCOUNT', id);
        return resp;
      })
      .catch(err => {
        throw err;
      });
  },
};

const getters = {
  accounts: state => state.accounts,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
