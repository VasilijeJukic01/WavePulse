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
  }
}
</script>

<style>
</style>
