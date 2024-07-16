import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // State
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    role: '',
    userStatus: '',
    name: '',
    users: [],
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
      state.userStatus = ''
      state.token = ''
      state.name = ''
      state.role = ''
    },
    setRole: (state, role) => state.role = role,
    setName: (state, name) => state.name = name,
    setUsers: (state, users) => state.users = users,
    setUser: (state, user) => state.user = user,
    setUserStatus: (state, status) => state.userStatus = status,
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
        axios({ url: 'http://localhost:8001/api/register', data: payload, method: 'POST' })
          .then(resp => {
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:8001/api/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const decodedToken = jwt.decode(token)
            const userStatus = decodedToken ? decodedToken.status : null
            if (userStatus !== 'ACTIVE') {
              commit('auth_error')
              reject(new Error('User is not active'))
            }
            const role = decodedToken ? Number(decodedToken.role) : null
            const name = decodedToken ? decodedToken.user : null
            localStorage.setItem('token', token)
            axios.defaults.headers.common.Authorization = token
            commit('auth_success', token)
            commit('setRole', role)
            commit('setName', name)
            commit('setUserStatus', userStatus)
            resolve(resp)
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
        axios({ url: `http://localhost:8080/api/users/${userId}`, method: 'GET' })
          .then(resp => {
            commit('setUser', resp.data.payload)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: `http://localhost:8080/api/users/update/${user.id}`, data: user, method: 'PUT' })
          .then(resp => {
            commit('setUser', resp.data.payload)
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
  },
  // Getters
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    userRole: state => state.role,
    userStatus: state => state.userStatus,
    userName: state => state.name,
    currentPage: state => state.currentPage,
  },
  plugins: [createPersistedState({
    paths: [
      'token',
      'role',
      'userStatus',
      'name',
      'users',
      'currentPage'
    ]
  })]
})
