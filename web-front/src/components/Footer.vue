<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="container mx-auto px-6">
      <div class="flex flex-wrap justify-between">
        <!-- Logo and Description -->
        <div class="w-full md:w-1/5 mb-6">
          <router-link to="/">
            <img src="../assets/logo.png" alt="WavePulse" class="h-16 w-56">
          </router-link>
          <p class="mt-4 text-gray-400">Explore your dream songs with WavePulse, your personalized music companion.</p>
        </div>
        <!-- Navigation Links -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold">Navigation</h3>
          <ul class="mt-4 space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-white">Home</router-link></li>
            <li><router-link to="/explore" class="text-gray-400 hover:text-white">Explore</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-white">About Us</router-link></li>
            <li><router-link to="/contact" class="text-gray-400 hover:text-white">Contact</router-link></li>
          </ul>
        </div>
        <!-- Legal Links -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold">Legal</h3>
          <ul class="mt-4 space-y-2">
            <li><router-link to="/terms" class="text-gray-400 hover:text-white">Terms of Service</router-link></li>
            <li><router-link to="/privacy" class="text-gray-400 hover:text-white">Privacy Policy</router-link></li>
          </ul>
        </div>
        <!-- Social Media Links -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold">Follow Us</h3>
          <ul class="mt-4 flex space-x-4">
            <li><a href="https://facebook.com" target="_blank" class="text-gray-400 hover:text-white"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com" target="_blank" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a></li>
            <li><a href="https://instagram.com" target="_blank" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a></li>
          </ul>
        </div>
        <!-- Newsletter Subscription -->
        <div class="w-full md:w-1/5 mb-6">
          <h3 class="text-lg font-semibold">Newsletter</h3>
          <form @submit.prevent="subscribe" class="mt-4">
            <div class="flex items-center">
              <input type="email" v-model="email" placeholder="Your email" class="w-full px-3 py-2 text-gray-800 rounded-l">
              <button type="submit" class="px-3 py-2 bg-indigo-500 text-white rounded-r hover:bg-indigo-600"><i class="fas fa-envelope"></i></button>
            </div>
          </form>
        </div>
      </div>
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 WavePulse - All rights reserved.</p>
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
  background-color: #1f2937; /* Tailwind's gray-900 */
  color: #f3f4f6; /* Tailwind's gray-100 */
}
.footer a:hover {
  color: #cb37e3;
}
</style>
