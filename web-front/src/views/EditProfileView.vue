<template>
  <div class="custom-bg min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="form-container shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="mb-6 text-center text-3xl font-bold text-white">Edit User</h1>
        <form @submit.prevent="modifyUser" class="mt-8 space-y-6">
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="firstName">
              First Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName" v-model="user.firstname" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="lastName">
              Last Name
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastName" v-model="user.lastname" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstName" v-model="user.username" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="email">
              Email
            </label>
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
import {mapActions, mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'editUser'
    ]),
    async modifyUser() {
      try {
        await this.editUser(this.user);
        await this.$router.push('/');
      } catch (error) {
        console.error('Failed to edit user:', error);
      }
    }
  },
}
</script>
<style scoped>
.custom-bg {
  background: url('~@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.form-container {
  background-color: #202c34;
  border-radius: 20px;
}
input[type="text"], input[type="email"], input[type="password"], select {
  border-radius: 10px;
}
</style>
