<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 form-bg py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-lg space-y-8 mx-auto mt-12">
        <h1 class="mb-6 text-center text-3xl font-bold text-white">Modify User</h1>
        <form @submit.prevent="modifyUser" class="mt-8 space-y-6">
          <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="firstName">First Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName" v-model="account.firstname" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="lastName">Last Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName" v-model="account.lastname" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">Username</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username" v-model="account.username" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="email">Email</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email" v-model="account.email" type="email" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="countryId">Country ID</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="countryId" v-model="account.countryId" type="number" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="accountStatus">Account Status</label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="accountStatus" v-model="account.accountStatus" required>
              <option value="ACTIVE">ACTIVE</option>
              <option value="LOCKED">LOCKED</option>
              <option value="PENDING">PENDING</option>
              <option value="DISABLED">DISABLED</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="role">Role</label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="role" v-model="account.role" required>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Artist">Artist</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit">
              Save Changes
            </button>
          </div>
        </form>
        <hr class="my-6 border-t border-gray-200">
        <div class="mb-4">
          <label class="block text-white text-sm font-bold mb-2" for="password">Password</label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password" v-model="password" type="password">
        </div>
        <div class="flex items-center justify-between">
          <button
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="changeAccountPassword">
            Update Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Sidebar from '@/components/siderbars/AdminPanelSidebar.vue';

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      errorMessage: '',
      userId: null,
      account: {},
      password: ''
    };
  },
  computed: {
    ...mapState('admin', [
      'accounts'
    ])
  },
  methods: {
    ...mapActions('admin', [
      'updateAccount',
      'updatePassword',
      'fetchAccount'
    ]),
    async modifyUser() {
      try {
        await this.updateAccount(this.account);
        await this.$router.push('/admin/manage-users');
      } catch (error) {
        this.errorMessage = error.message || 'An error occurred';
      }
    },
    async changeAccountPassword() {
      try {
        await this.updatePassword({id: this.userId, password: this.password});
        await this.$router.push('/admin/manage-users');
      } catch (error) {
        this.errorMessage = error.message || 'An error occurred';
      }
    }
  },
  async created() {
    this.userId = this.$route.params.id;
    const response = await this.fetchAccount(this.userId);
    this.account = response.data;
  }
}
</script>

<style scoped>
.form-bg {
  background-color: #1b1b1b;
  min-height: 100vh;
}
</style>
