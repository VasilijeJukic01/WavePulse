<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 form-bg py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-lg space-y-8 mx-auto mt-12">
        <h1 class="mb-6 text-center text-3xl font-bold text-white">Edit Public Profile</h1>
        <form @submit.prevent="modifyArtist" class="mt-8 space-y-6">
          <div v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="name">Artist Name</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name" v-model="artist.name" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="year">Establishment Year</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="year" v-model="artist.establishmentYear" type="number" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="description">Description</label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description" v-model="artist.description" type="text" required>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="country">Country</label>
            <v-select
              :options="countries"
              label="name"
              v-model="artist.countryId"
              :reduce="country => country.id"
              placeholder="Select a country"
            />
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
import { mapActions, mapGetters } from 'vuex';
import Sidebar from '@/components/siderbars/ArtistPanelSidebar.vue';
import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';

export default {
  components: {
    Sidebar,
    vSelect
  },
  data() {
    return {
      errorMessage: '',
    };
  },
  computed: {
    ...mapGetters('artist', ['artist', 'countries']),
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions('artist', ['fetchCountries', 'editArtist', 'fetchArtistByUserId']),
    async modifyArtist() {
      try {
        await this.editArtist(this.artist);
        await this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.message || 'An error occurred';
      }
    }
  },
  created() {
    this.fetchCountries();
    this.fetchArtistByUserId(this.user.id);
  }
}
</script>

<style scoped>
.form-bg {
  background-color: #1b1b1b;
  min-height: 100vh;
}
</style>
