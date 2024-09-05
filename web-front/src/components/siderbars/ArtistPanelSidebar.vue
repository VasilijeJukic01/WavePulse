<template>
  <div class="flex">
    <aside class="w-64 h-screen bg-customColor text-white">
      <div class="p-6 flex items-center">
        <i class="fas fa-user-shield text-2xl mr-2"></i>
        <span class="text-2xl font-semibold text-white">Artist Panel</span>
      </div>
      <nav class="mt-6">
        <ul>
          <li class="mb-4">
            <router-link to="/artist/edit-public-profile" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-users mr-3"></i> Edit Public Profile
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/artist/manage-songs" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-music mr-3"></i> Manage Songs
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/artist/analytics" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-chart-bar mr-3"></i> Analytics
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
export default {
  name: 'ArtistPanelSidebar'
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
