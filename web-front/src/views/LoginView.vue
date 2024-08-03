<template>
  <div class="video-bg min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
    <video autoplay muted loop>
      <source src="@/assets/background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="max-w-md w-full space-y-8">
      <div class="form-container shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">Sign in</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="loginUser">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="mb-4">
              <label for="username" class="sr-only">Username</label>
              <input v-model="user.username" id="username" name="username" type="text" autocomplete="username"
                     required
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
          </div>
          <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
          <div v-if="loginMessage" class="message text-white">
            {{ loginMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      loginMessage: ''
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    async loginUser() {
      try {
        await this.login(this.user)
        this.loginMessage = 'Login successful!'
        await this.$router.push('/')
      } catch (error) {
        this.loginMessage = 'Login failed: ' + error.message
      }
    }
  }
}
</script>

<style scoped>
.video-bg {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1;
}

video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 0;
}

.form-container {
  position: relative;
  z-index: 2;
  background-color: #151d22;
  border-radius: 20px;
}
input[type="text"], input[type="email"], input[type="password"], select {
  border-radius: 10px;
}
</style>
