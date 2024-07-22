<template>
  <div class="custom-bg flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="mb-6 text-3xl font-bold text-gray-700">Edit User</h1>
    <form @submit.prevent="modifyUser" class="w-full max-w-md bg-white rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
          First Name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" v-model="user.firstName" type="text" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
          Last Name
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" v-model="user.lastName" type="text" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" v-model="user.email" type="email" required>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
          Role
        </label>
        <select class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="role" v-model="user.roleId" required>
          <option value="1">ADMIN</option>
          <option value="2">MODERATOR</option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        roleId: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'editUser'
    ]),
    async loadUser() {
      const response = await this.fetchUser(this.$route.params.id)
      this.user = response.data.payload
    },
    async modifyUser() {
      try {
        await this.editUser(this.user)
        await this.$router.push('/admin')
      } catch (error) {
        console.error('Failed to edit user:', error)
      }
    }
  },
  created() {
    this.loadUser()
  }
}
</script>
