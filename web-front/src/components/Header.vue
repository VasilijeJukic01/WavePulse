<template>
  <header class="bg-gray-900 shadow-lg">
    <nav class="container mx-auto px-6 py-4 flex items-center justify-between">
      <router-link to="/">
        <img src="../assets/logo.png" alt="WavePulse" class="h-16 w-56">
      </router-link>
      <div class="flex items-center space-x-4">
        <router-link v-if="user.roleId === -1" to="/login" class="text-gray-300 text-lg hover:text-white transition duration-300">{{ $t('header.login') }}</router-link>
        <router-link v-if="user.roleId === -1" to="/register" class="text-gray-300 text-lg hover:text-white transition duration-300">{{ $t('header.register') }}</router-link>
        <router-link v-if="user.roleId === 1" to="/admin/manage-users" class="text-gray-300 text-lg hover:text-white transition duration-300">{{ $t('header.admin_panel') }}</router-link>
        <router-link v-if="user.roleId !== -1" to="/admin" class="text-gray-300 text-lg hover:text-white transition duration-300">{{ $t('header.news') }}</router-link>
        <router-link v-if="user.roleId !== -1" to="/admin" class="text-gray-300 text-lg hover:text-white transition duration-300">{{ $t('header.discover') }}</router-link>
        <router-link v-if="user.roleId === 3" to="/artist/manage-songs" class="text-gray-300 text-lg hover:text-white transition duration-300">{{ $t('header.artist_panel') }}</router-link>
        <div v-if="user.roleId !== -1" class="relative">
          <button @click="toggleDropdown" class="text-gray-300 text-lg hover:text-white transition duration-300 flex items-center">
            {{ $t('header.profile') }}
            <i class="fas fa-caret-down ml-2"></i>
          </button>
          <div v-if="showDropdown" class="profile-dropdown absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <router-link :to="`/edit-profile/${user.id}`" @click.native="toggleDropdown" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ $t('header.settings') }}</router-link>
            <button @click="logoutUser" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{{ $t('header.logout') }}</button>
          </div>
        </div>
        <SearchBar v-if="user.roleId !== -1" @search="handleSearch" />
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SearchBar from './bars/SearchBar.vue';

export default {
  name: 'Header',
  components: { SearchBar },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapGetters(['user']),
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
    },
    handleSearch(query) {
      console.log('Search query:', query);
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: #9ca3af;
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
.shadow-lg {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}
</style>
