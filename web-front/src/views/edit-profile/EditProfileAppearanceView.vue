<template>
  <div class="flex min-h-screen">
    <Sidebar />
    <div class="flex-1 form-bg py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-lg space-y-8 mx-auto mt-12">
        <h1 class="mb-6 text-center text-3xl font-bold text-white">{{ $t('settings.appearance.edit_appearance') }}</h1>
        <form @submit.prevent="saveSettings" class="mt-8 space-y-6">
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="theme">{{ $t('settings.appearance.theme') }}</label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="theme" v-model="settings.theme" required>
              <option value="0">{{ $t('settings.appearance.light') }}</option>
              <option value="1">{{ $t('settings.appearance.dark') }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-white text-sm font-bold mb-2" for="language">{{ $t('settings.appearance.language') }}</label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="language" v-model="settings.language" required>
              <option value="EN">{{ $t('settings.appearance.english') }}</option>
              <option value="SR">{{ $t('settings.appearance.serbian') }}</option>
            </select>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit">
              {{ $t('settings.appearance.save_changes') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Sidebar from '@/components/siderbars/SettingsSidebar.vue';
import settings from "@/store/modules/settings";

export default {
  components: {
    Sidebar
  },
  computed: {
    settings() {
      return settings
    },
    ...mapGetters(['settings'])
  },
  methods: {
    ...mapActions(['updateSettings']),
    async saveSettings() {
      try {
        await this.updateSettings(this.settings);
        const selectedLanguage = this.settings.language.toLowerCase();
        this.$i18n.locale = selectedLanguage;
        localStorage.setItem('locale', selectedLanguage);
        await this.$router.push('/');
      } catch (error) {
        console.error('Failed to save settings:', error);
      }
    }
  },
  created() {
    this.$store.dispatch('fetchSettings', this.$store.getters.user.id);
  }
}
</script>

<style scoped>
.form-bg {
  background-color: #1b1b1b;
  min-height: 100vh;
}
</style>
