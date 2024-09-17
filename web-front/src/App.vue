<template>
  <div class="custom-bg" id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import axios from "axios";
import store from './store';
import jwt from 'jsonwebtoken';

export default {
  components: {
    Header,
    Footer
  },
  created() {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common.Authorization = token
    }

    axios.interceptors.response.use(response => response,
      error => {
        if (error.response && error.response.status === 401) {
          store.dispatch('logout').then(() => {
            this.$router.push({ path: '/login' });
          });
        }
        return Promise.reject(error);
      }
    );

    this.checkTokenExpiration();
    setInterval(this.checkTokenExpiration, 60000);
  },
  methods: {
    checkTokenExpiration() {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          store.dispatch('logout').then(() => {
            this.$router.push({ path: '/login' });
          });
        }
      }
    }
  }
}
</script>

<style>
</style>
