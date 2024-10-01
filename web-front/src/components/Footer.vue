<template>
  <footer class="footer py-8">
    <div class="container mx-auto px-6">
      <div class="flex flex-wrap justify-between">
        <!-- Logo and Description -->
        <div class="w-full md:w-1/5 mb-6">
          <router-link to="/">
            <img src="../assets/logo.png" alt="WavePulse" class="h-16 w-56">
          </router-link>
          <p class="mt-4 text-gray-400">{{ $t('footer.description') }}</p>
        </div>
        <!-- Navigation Links -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold text-gray-100">{{ $t('footer.navigation') }}</h3>
          <ul class="mt-4 space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-white">{{ $t('footer.home') }}</router-link></li>
            <li><router-link to="/explore" class="text-gray-400 hover:text-white">{{ $t('footer.explore') }}</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-white">{{ $t('footer.about_us') }}</router-link></li>
            <li><router-link to="/contact" class="text-gray-400 hover:text-white">{{ $t('footer.contact') }}</router-link></li>
          </ul>
        </div>
        <!-- Legal Links -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold text-gray-100">{{ $t('footer.legal') }}</h3>
          <ul class="mt-4 space-y-2">
            <li><router-link to="/terms-of-service" class="text-gray-400 hover:text-white">{{ $t('footer.terms_of_service.title') }}</router-link></li>
            <li><router-link to="/privacy" class="text-gray-400 hover:text-white">{{ $t('footer.privacy_policy.title') }}</router-link></li>
          </ul>
        </div>
        <!-- Social Media Links -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold text-gray-100">{{ $t('footer.follow_us') }}</h3>
          <ul class="mt-4 flex space-x-4">
            <li><a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-white"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
        <!-- Newsletter Subscription -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold text-gray-100">{{ $t('footer.newsletter') }}</h3>
          <form @submit.prevent="subscribe" class="mt-4">
            <div class="flex items-center">
              <input type="email" v-model="email" :placeholder="$t('footer.subscribe_placeholder')" class="w-full px-3 py-2 text-gray-800 rounded-l">
              <button type="submit" class="px-3 py-2 bg-indigo-500 text-white rounded-r hover:bg-indigo-600"><i class="fas fa-envelope"></i></button>
            </div>
          </form>
        </div>
      </div>
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: ''
    };
  },
  methods: {
    subscribe() {
      // TODO: Implement newsletter subscription
      console.log(`Subscribed with email: ${this.email}`);
    }
  }
};
</script>

<style scoped>
.footer {
  background-color: #111;
  color: #b0b0b0;
}
.footer a:hover {
  color: #ffffff;
}
</style>
