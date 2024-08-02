<template>
  <div class="flex">
    <aside class="w-64 h-screen bg-customColor text-white">
      <div class="p-6 flex items-center">
        <i class="fas fa-user-circle text-2xl mr-2"></i>
        <router-link to="/" class="text-2xl font-semibold text-white">{{ user.username }}</router-link>
      </div>
      <nav class="mt-6">
        <ul>
          <li class="mb-4">
            <router-link :to="`/edit-profile/${user.id}`" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-user-edit mr-3"></i> Edit Profile
            </router-link>
          </li>
          <li class="mb-4">
            <router-link :to="`/edit-profile/change-password/${user.id}`" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-key mr-3"></i> Change Password
            </router-link>
          </li>
          <li class="mb-4">
            <router-link :to="`/edit-profile/appearance/${user.id}`" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-paint-brush mr-3"></i> Appearance
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="flex-1">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style scoped>
.bg-customColor {
  background-color: #171717;
}

aside {
  height: calc(100vh + 12vh);
  top: 12vh;
}
</style>
