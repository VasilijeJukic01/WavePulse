<template>
  <div class="custom-bg flex flex-col" >
    <div class="p-5 flex justify-between">
      <div></div>
      <router-link to="/admin/register" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Register User
      </router-link>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> <!-- New Status Column -->
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.firstName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ user.lastName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ user.roleId }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ user.status }}</div> <!-- New Status Column -->
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button @click="changeUserStatus(user)" class="px-4 py-2 text-white bg-blue-500 rounded">Change Status</button>
                <button @click="editUser(user)" class="px-4 py-2 ml-2 text-white bg-green-500 rounded">Edit User</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      users: []
    }
  },
  methods: {
    ...mapActions([
      'fetchUsers'
    ]),
    async changeUserStatus(user) {
      try {
        const newStatus = user.status === 0 ? 1 : 0;
        await this.$store.dispatch('changeStatus', { user, newStatus });
        await this.fetchUsers();
        this.users = this.$store.state.users;
      } catch (error) {
        console.error('Failed to change user status:', error);
      }
    },
    editUser(user) {
      this.$router.push({ name: 'EditUser', params: { id: user.id } })
    }
  },
  async created() {
    try {
      await this.fetchUsers()
      this.users = this.$store.state.users
    } catch (error) {
      console.error('Failed to fetch users:', error)
    }
  }
}
</script>

<style scoped>
</style>
