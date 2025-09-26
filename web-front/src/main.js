import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import store from './store';

import './assets/main.css';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');
