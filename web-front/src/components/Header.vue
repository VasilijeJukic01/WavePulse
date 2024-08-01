<template>
  <header class="bg-gray-900 shadow-lg">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <router-link to="/">
        <img src="../assets/logo.png" alt="WavePulse" class="h-16 w-56">
      </router-link>
      <div class="flex items-center space-x-4">
        <router-link v-if="user.roleId === -1" to="/login" class="text-gray-300 text-lg hover:text-white transition duration-300">Login</router-link>
        <router-link v-if="user.roleId === -1" to="/register" class="text-gray-300 text-lg hover:text-white transition duration-300">Register</router-link>
        <router-link v-if="user.roleId === 1" to="/admin" class="text-gray-300 text-lg hover:text-white transition duration-300">Admin Panel</router-link>
        <router-link v-if="user.roleId !== -1" to="/admin" class="text-gray-300 text-lg hover:text-white transition duration-300">News</router-link>
        <router-link v-if="user.roleId !== -1" to="/admin" class="text-gray-300 text-lg hover:text-white transition duration-300">Discover</router-link>
        <div v-if="user.roleId !== -1" class="relative">
          <button @click="toggleDropdown" class="text-gray-300 text-lg hover:text-white transition duration-300 flex items-center">
            Profile
            <i class="fas fa-caret-down ml-2"></i>
          </button>
          <div v-if="showDropdown" class="profile-dropdown absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <router-link :to="`/edit-profile/${user.id}`" @click.native="toggleDropdown" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Profile</router-link>
            <button @click="logoutUser" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
          </div>
        </div>
        <div class="relative">
          <input type="text" placeholder="Search" class="bg-gray-800 text-gray-300 py-2 pl-4 pr-10 rounded-full focus:outline-none focus:bg-gray-700 search-text">
          <button class="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4 text-gray-400 hover:text-white">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      showDropdown: false
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions(['logout']),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
      document.addEventListener('click', this.handleOutsideClick, true);
    },
    handleOutsideClick(e) {
      if (!this.$el.contains(e.target)) {
        this.showDropdown = false;
        document.removeEventListener('click', this.handleOutsideClick, true);
      }
    },
    async logoutUser() {
      try {
        await this.logout();
        await this.$router.push('/login');
        this.showDropdown = false;
        document.removeEventListener('click', this.handleOutsideClick, true);
      } catch (error) {
        console.error('Logout failed: ' + error.message);
      }
    }
  }
}
</script>

<style scoped>
input::placeholder {
  color: #9ca3af;
}
.search-text:hover {
  color: white;
}
header {
  height: 12vh;
}
input[type="text"] {
  width: 30vw;
}
.profile-dropdown {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.bg-gray-900 {
  background-color: #111;
}
.text-gray-300 {
  color: #b0b0b0;
}
.text-gray-300:hover {
  color: #ffffff;
}
.search-text {
  background-color: #202020;
}
.search-text:focus {
  background-color: #333333;
}
.shadow-lg {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
