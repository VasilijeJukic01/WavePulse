<template>
  <div class="custom-bg min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="form-container shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
            Register
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="registerUser">
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="mb-4">
              <label for="first-name" class="sr-only">First Name</label>
              <input v-model="user.firstName" id="first-name" name="first-name" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     placeholder="First Name">
            </div>
            <div class="mb-4">
              <label for="last-name" class="sr-only">Last Name</label>
              <input v-model="user.lastName" id="last-name" name="last-name" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     placeholder="Last Name">
            </div>
            <div class="mb-4">
              <label for="email-address" class="sr-only">Email address</label>
              <input v-model="user.email" id="email-address" name="email" type="email" autocomplete="email"
                     required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     placeholder="Email address">
            </div>
            <div class="mb-4">
              <label for="username" class="sr-only">Username</label>
              <input v-model="user.username" id="username" name="username" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     placeholder="Username">
            </div>
            <div class="mb-4">
              <label for="password" class="sr-only">Password</label>
              <input v-model="user.password" id="password" name="password" type="password"
                     autocomplete="current-password"
                     required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     placeholder="Password">
            </div>
            <div class="mb-4">
              <label for="confirm-password" class="sr-only">Confirm Password</label>
              <input v-model="user.confirmation" id="confirm-password" name="confirm-password" type="password"
                     autocomplete="current-password"
                     required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     placeholder="Confirm Password">
            </div>
          </div>
          <div class="mb-4">
            <label for="user-type" class="sr-only">User Type</label>
            <select v-model="user.roleId" id="user-type" name="user-type" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4">
              <option value="User">User</option>
              <option value="Artist">Artist</option>
            </select>
          </div>
          <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </div>
          <div v-if="registerMessage" class="message text-white" v-html="registerMessage">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      user: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmation: '',
        countryId: 1,
        roleId: 'User'
      },
      registerMessage: ''
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    async registerUser() {
      try {
        await this.register(this.user)
        this.registerMessage = 'Registration successful!'
        await this.$router.push('/')
      } catch (error) {
        this.registerMessage = 'Registration failed:<br>- ' + error.message.split(',').join('<br>- ')
      }
    }
  }
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
.message {
  color: white;
}
</style>
