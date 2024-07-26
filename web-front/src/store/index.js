import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // State
  state: {
    user: {},
    status: '',
    token: localStorage.getItem('token') || '',
    users: [],
    songs: [],
    currentPage: 1,
  },
  // Mutations
  mutations: {
    auth_request: state => state.status = 'loading',
    auth_error: state => state.status = 'error',
    auth_success (state, token) {
      state.status = 'success'
      state.token = token
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.user = {}
      state.user.roleId = -1
    },
    setUsers: (state, users) => state.users = users,
    setUser: (state, user) => state.user = user,
    setUserId: (state, userId) => state.userId = userId,
    setSongs: (state, songs) => state.songs = songs,
  },
  // Actions
  actions: {
    register ({ commit }, user) {
      if (user.password !== user.confirmation) {
        return new Promise((resolve, reject) => {
          reject(new Error('Password and confirmation do not match'))
        })
      }
      const payload = {
        username: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.roleId,
        email: user.email,
        password: user.password,
        countryId: user.countryId
      }
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:8080/auth/register', data: payload, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:8080/auth/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const decodedToken = jwt.decode(token)
            const userStatus = decodedToken ? decodedToken.status : null
            if (userStatus !== 'ACTIVE') {
              commit('auth_error')
              reject(new Error('User is not active'))
            }
            const userId = decodedToken ? decodedToken.userId : null
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', token)
            commit('setUserId', userId)

            dispatch('fetchUser', userId).then(() => {
              resolve(resp)
            }).catch(err => {
              commit('auth_error')
              reject(err)
            })
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise(resolve => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common.Authorization
        resolve()
      })
    },
    fetchUsers({ commit }) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:8080/api/users/all', method: 'GET' })
          .then(resp => {
            commit('setUsers', resp.data.payload)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    changeStatus({ commit }, { user, newStatus }) {
      return new Promise((resolve, reject) => {
        axios({ url: `http://localhost:8080/api/users/status/${user.id}?status=${newStatus}`, data: user, method: 'PUT' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    fetchUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        axios({ url: `http://localhost:8080/api/user/${userId}`, method: 'GET' })
          .then(resp => {
            commit('setUser', resp.data)
            commit('setUserId', resp.data.id)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editUser({ commit, dispatch }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: `http://localhost:8080/auth/edit-profile/${user.id}`, data: user, method: 'PUT' })
          .then(resp => {
            dispatch('fetchUser', user.id)
              .then(() => {
                resolve(resp);
              })
              .catch(fetchError => {
                console.error('Error fetching user after update:', fetchError);
                reject(fetchError);
              });
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchReleaseId({ commit }, { title, artist }) {
      return new Promise((resolve, reject) => {
        console.log(artist, title)
        axios({ url: `https://cors-anywhere.herokuapp.com/https://musicbrainz.org/ws/2/release/?query=release:"${title}" AND artist:"${artist}"`, method: 'GET' })
          .then(resp => {
            const releaseId = resp.data.releases[1].id;
            resolve(releaseId);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchCoverImage({ commit }, releaseId) {
      return new Promise((resolve, reject) => {
        axios({
          url: `https://cors-anywhere.herokuapp.com/https://coverartarchive.org/release/${releaseId}/front`,
          method: 'GET',
          responseType: 'blob'
        })
          .then(resp => {
            const blob = new Blob([resp.data], { type: resp.headers['content-type'] });
            const coverImageUrl = URL.createObjectURL(blob);
            resolve(coverImageUrl);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    fetchSongs({ commit, dispatch }, page) {
      return new Promise((resolve, reject) => {
        axios({ url: `http://localhost:8080/api/song/full`, method: 'GET' })
          .then(resp => {
            const songs = resp.data;
            const promises = songs.map(song => {
              return dispatch('fetchReleaseId', { title: song.name, artist: "" })
                .then(releaseId => {
                  return dispatch('fetchCoverImage', releaseId)
                    .then(coverImageUrl => {
                      song.cover = coverImageUrl;
                      console.log('Cover image:', coverImageUrl);
                      return song;
                    });
                });
            });
            Promise.all(promises)
              .then(updatedSongs => {
                commit('setSongs', updatedSongs);
                resolve(resp);
              })
              .catch(err => {
                reject(err);
              });
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  // Getters
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user,
    songs: state => state.songs,
    currentPage: state => state.currentPage,
  },
  plugins: [createPersistedState({
    paths: [
      'token',
      'user',
      'users',
      'currentPage'
    ]
  })]
})
