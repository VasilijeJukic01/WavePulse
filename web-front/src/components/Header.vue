<template>
  <header class="bg-gray-800">
    <nav class="container mx-auto px-6 py-3">
      <div class="flex items-center justify-between">
        <router-link to="/home" class="text-white text-3xl font-bold">WavePulse</router-link>
        <div class="flex items-center">
          <router-link to="/home" class="text-gray-200 text-sm mx-3">Home</router-link>
          <router-link v-if="userRole === ''" to="/login" class="text-gray-200 text-sm mx-3">Login</router-link>
          <router-link v-if="userRole === ''" to="/register" class="text-gray-200 text-sm mx-3">Register</router-link>
          <router-link v-if="userRole === 'Admin'" to="/admin" class="text-gray-200 text-sm mx-3">Admin Panel</router-link>
          <button v-if="userRole !== ''" @click="logoutUser" class="text-gray-200 text-sm mx-3">Logout</button>
          <div v-if="userName" class="text-gray-200 text-sm mx-3 bg-green-900 px-2 py-1 rounded shadow">
            Logged in as: {{ userName }}
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'Header',

  computed: {
    ...mapGetters([
      'userRole',
      'userStatus',
      'userName'
    ])
  },

  methods: {
    ...mapActions([
      'logout'
    ]),

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
.text-gray-200:hover,
.text-3xl.font-bold:hover {
  color: #cb37e3;
}
</style>
