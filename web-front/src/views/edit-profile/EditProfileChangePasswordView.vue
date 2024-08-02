<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 form-bg py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-lg space-y-8 mx-auto mt-12">
        <h1 class="mb-6 text-center text-3xl font-bold text-white">Change Password</h1>
        <form @submit.prevent="changePassword" class="mt-8 space-y-6">
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              v-model="oldPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="repeatNewPassword">Repeat New Password</label>
            <input
              type="password"
              id="repeatNewPassword"
              v-model="repeatNewPassword"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div v-if="errorMessage" class="mb-4 text-red-500 text-sm">
            {{ errorMessage }}
          </div>
          <div v-if="validationErrors.length" class="mb-4 text-red-500 text-sm">
            <ul>
              <li v-for="error in validationErrors" :key="error.msg">{{ error.msg }}</li>
            </ul>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      repeatNewPassword: '',
      errorMessage: '',
      validationErrors: []
    };
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'updatePassword'
    ]),
    async changePassword() {
      if (this.newPassword !== this.repeatNewPassword) {
        this.errorMessage = 'New passwords do not match';
        return;
      }
      try {
        await this.updatePassword({
          userId: this.user.id,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        });
        await this.$router.push('/');
      } catch (error) {
          this.errorMessage = error.message;
      }
    }
  }
}
</script>

<style scoped>
.form-bg {
  background-color: #1b1b1b;
  min-height: 100vh;
}

input {
  border-radius: 10px;
}
</style>
