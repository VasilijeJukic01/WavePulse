<template>
  <div class="custom-bg min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
    <video autoplay muted loop>
      <source src="@/assets/background.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="max-w-md w-full space-y-8">
      <div class="form-container shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white">{{ $t('admin_panel.add_user_view.add_new_user') }}</h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="registerUser">
          <input type="hidden" name="remember" value="true">
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="mb-4">
              <label for="first-name" class="sr-only">{{ $t('admin_panel.add_user_view.first_name') }}</label>
              <input v-model="user.firstName" id="first-name" name="first-name" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     :placeholder="$t('admin_panel.add_user_view.first_name')">
            </div>
            <div class="mb-4">
              <label for="last-name" class="sr-only">{{ $t('admin_panel.add_user_view.last_name') }}</label>
              <input v-model="user.lastName" id="last-name" name="last-name" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     :placeholder="$t('admin_panel.add_user_view.last_name')">
            </div>
            <div class="mb-4">
              <label for="email" class="sr-only">{{ $t('admin_panel.add_user_view.email_address') }}</label>
              <input v-model="user.email" id="email" name="email" type="email" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     :placeholder="$t('admin_panel.add_user_view.email_address')">
            </div>
            <div class="mb-4">
              <label for="username" class="sr-only">{{ $t('admin_panel.add_user_view.username') }}</label>
              <input v-model="user.username" id="username" name="username" type="text" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     :placeholder="$t('admin_panel.add_user_view.username')">
            </div>
            <div class="mb-4">
              <label for="password" class="sr-only">{{ $t('admin_panel.add_user_view.password') }}</label>
              <input v-model="user.password" id="password" name="password" type="password" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     :placeholder="$t('admin_panel.add_user_view.password')">
            </div>
            <div class="mb-4">
              <label for="confirm-password" class="sr-only">{{ $t('admin_panel.add_user_view.confirm_password') }}</label>
              <input v-model="user.confirmation" id="confirm-password" name="confirm-password" type="password" required
                     class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4"
                     :placeholder="$t('admin_panel.add_user_view.confirm_password')">
            </div>
          </div>
          <div class="mb-4">
            <label for="user-type" class="sr-only">{{ $t('admin_panel.add_user_view.user_type') }}</label>
            <select v-model="user.roleId" id="user-type" name="user-type" required
                    class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mb-4">
              <option value="User">{{ $t('admin_panel.add_user_view.user') }}</option>
              <option value="Artist">{{ $t('admin_panel.add_user_view.artist') }}</option>
              <option value="Admin">{{ $t('admin_panel.add_user_view.admin') }}</option>
            </select>
          </div>
          <div>
            <button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              {{ $t('admin_panel.add_user_view.register') }}
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
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.custom-bg::before {
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

.message {
  color: white;
}
</style>
