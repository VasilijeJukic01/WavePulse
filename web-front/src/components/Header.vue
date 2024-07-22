<template>
  <header class="bg-gray-900 shadow-lg">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <router-link to="/home">
        <img src="../assets/logo.png" alt="WavePulse" class="h-16 w-56">
      </router-link>
      <div class="flex items-center space-x-4">
        <router-link to="/home" class="text-gray-300 text-sm hover:text-white transition duration-300">Home</router-link>
        <router-link v-if="userRole === ''" to="/login" class="text-gray-300 text-sm hover:text-white transition duration-300">Login</router-link>
        <router-link v-if="userRole === ''" to="/register" class="text-gray-300 text-sm hover:text-white transition duration-300">Register</router-link>
        <router-link v-if="userRole === 'Admin'" to="/admin" class="text-gray-300 text-sm hover:text-white transition duration-300">Admin Panel</router-link>
        <button v-if="userRole !== ''" @click="logoutUser" class="text-gray-300 text-sm hover:text-white transition duration-300">Logout</button>
        <div v-if="userName" class="text-gray-300 text-sm bg-green-800 px-2 py-1 rounded shadow">Logged in as: {{ userName }}</div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['userRole', 'userStatus', 'userName'])
  },
  methods: {
    ...mapActions(['logout']),
    async logoutUser() {
      try {
        await this.logout()
        await this.$router.push('/login')
      } catch (error) {
        console.error('Logout failed: ' + error.message)
      }
    }
  }
}
</script>

<style scoped>
.text-gray-300:hover,
.text-4xl.font-bold:hover {
  color: #cb37e3;
}
</style>
