<template>
  <div class="flex">
    <aside class="w-64 h-screen bg-customColor text-white">
      <div class="p-6 flex items-center">
        <i class="fas fa-user-shield text-2xl mr-2"></i>
        <span class="text-2xl font-semibold text-white">Admin Panel</span>
      </div>
      <nav class="mt-6">
        <ul>
          <li class="mb-4">
            <router-link to="/admin/manage-users" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-users mr-3"></i> Manage Users
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/admin/pending-users" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-clock mr-3"></i> Pending Users
            </router-link>
          </li>
          <li class="mb-4">
            <router-link to="/admin/logs" class="flex items-center py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-700 rounded transition duration-200">
              <i class="fas fa-cogs mr-3"></i> Security Logs
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
  name: 'AdminPanelSidebar'
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
