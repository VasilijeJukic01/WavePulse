import axios from 'axios';
import jwt from 'jsonwebtoken';
import { makeApiRequest } from '../utils/util';

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

const state = {
  user: {},
  token: localStorage.getItem('token') || '',
  status: '',
};

const mutations = {
  AUTH_SUCCESS (state, token) {
    state.status = 'success';
    state.token = token;
  },
  SET_USER: (state, user) => state.user = user,
  SET_USER_ID: (state, userId) => state.userId = userId,
  LOGOUT (state) {
    state.status = '';
    state.token = '';
    state.user = {};
    state.user.roleId = -1;
  },
};

const actions = {
// Register
  register({ commit }, user) {
    if (user.password !== user.confirmation) {
      return Promise.reject(new Error('Password and confirmation do not match'));
    }
    const payload = {
      username: user.username,
      firstname: user.firstName,
      lastname: user.lastName,
      role: user.roleId,
      email: user.email,
      password: user.password,
      countryId: user.countryId,
    };
    return makeApiRequest('/auth/register', payload, 'POST')
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
  // Login
  login({ commit, dispatch }, user) {
    return makeApiRequest('/auth/login', user, 'POST')
      .then(resp => {
        const token = resp.data.token;
        const decodedToken = jwt.decode(token);
        const userStatus = decodedToken ? decodedToken.status : null;
        if (userStatus !== 'ACTIVE') {
          return Promise.reject(new Error('User is not active'));
        }
        const userId = decodedToken ? decodedToken.userId : null;
        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = token;
        commit('AUTH_SUCCESS', token);
        commit('SET_USER_ID', userId);

        return dispatch('fetchUser', userId).then(() => resp);
      })
      .catch(err => {
        localStorage.removeItem('token');
        if (err.response) {
          throw new Error(err.response.data.error || 'An error occurred');
        } else {
          throw err;
        }
      });
  },
  // Fetch current user info
  fetchUser({ commit }, userId) {
    return makeApiRequest(`/api/user/${userId}`, null, 'GET')
      .then(resp => {
        commit('SET_USER', resp.data);
        commit('SET_USER_ID', resp.data.id);
        return resp;
      })
      .catch(err => {
        throw err;
      });
  },
  // Update user
  editUser({ commit, dispatch }, user) {
    return makeApiRequest(`/auth/edit-profile/${user.id}`, user, 'PUT')
      .then(resp => {
        return dispatch('fetchUser', user.id).then(() => resp);
      })
      .catch(err => {
        if (err.response) {
          throw new Error(err.response.data.error || 'An error occurred');
        } else {
          throw err;
        }
      });
  },
  // Update password
  updatePassword({ commit }, passwordData) {
    return makeApiRequest(`/auth/change-password/${passwordData.userId}`, passwordData, 'PUT')
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
  // Logout
  logout ({ commit }) {
    return new Promise(resolve => {
      commit('LOGOUT');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      resolve();
    });
  },
};

const getters = {
  isLoggedIn: state => !!state.token,
  user: state => state.user
};

export default {
  state,
  mutations,
  actions,
  getters
};
