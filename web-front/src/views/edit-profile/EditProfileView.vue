<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 form-bg py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-lg space-y-8 mx-auto mt-12">
        <h1 class="mb-6 text-center text-3xl font-bold text-white">Edit Profile</h1>
        <form @submit.prevent="modifyUser" class="mt-8 space-y-6">
          <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="firstName">First Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName" v-model="user.firstname" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="lastName">Last Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName" v-model="user.lastname" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">Username</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" v-model="tempUsername" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="email">Email</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" v-model="user.email" type="email" required>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Sidebar from '@/components/siderbars/SettingsSidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      errorMessage: '',
      tempUsername: ''
    };
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  watch: {
    user: {
      immediate: true,
      handler(newValue) {
        this.tempUsername = newValue.username;
      }
    }
  },
  methods: {
    ...mapActions([
      'editUser'
    ]),
    async modifyUser() {
      try {
        this.user.username = this.tempUsername;
        await this.editUser(this.user);
        await this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.message || 'An error occurred';
      }
    }
  },
}
</script>

<style scoped>
.form-bg {
  background-color: #1b1b1b;
  min-height: 100vh;
}
</style>
