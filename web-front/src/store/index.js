import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import admin from './modules/admin';
import artist from './modules/artist';
import settings from './modules/settings';
import songs from './modules/songs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    admin,
    artist,
    settings,
    songs
  },
  plugins: [createPersistedState({
    paths: [
      'user.token',
      'user.user',
      'songs.currentPage',
    ],
  })],
});
