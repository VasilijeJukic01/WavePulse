import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import settings from './modules/settings';
import songs from './modules/songs';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    settings,
    songs,
  },
  plugins: [createPersistedState({
    paths: [
      'user.token',
      'user.user',
      'user.users',
      'songs.currentPage',
    ],
  })],
});
