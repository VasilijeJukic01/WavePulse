<template>
  <div class="flex min-h-screen bg-gray-900">
    <AdminPanelSidebar />
    <div class="flex-1 form-bg py-8 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-7xl space-y-8 mx-auto mt-12">
        <h1 class="mb-6 text-center text-4xl font-extrabold text-white">{{ $t('admin_panel.manage_users_view.account_management') }}</h1>
        <div class="actions flex justify-end space-x-4">
          <button class="btn btn-primary flex items-center space-x-2" @click="navigateToAddUser">
            <span>{{ $t('admin_panel.manage_users_view.add_user') }}</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/></svg>
          </button>
        </div>

        <div class="account-list mt-8">
          <table class="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead>
            <tr class="bg-gray-700 text-left">
              <th class="px-6 py-3 cursor-pointer" @click="sort('username')">
                {{ $t('admin_panel.manage_users_view.username') }}
                <span class="sort-icon" v-if="sortKey === 'username'">
                  <svg v-if="sortOrder === 'asc'" class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M5.05 8.636a.75.75 0 01-.053-1.06l3-3.25a.75.75 0 011.106 0l3 3.25a.75.75 0 01-1.106 1.06L10 6.081V13.25a.75.75 0 01-1.5 0V6.081L5.103 8.577a.75.75 0 01-1.053.059z"/></svg>
                  <svg v-else class="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20"><path d="M10 11.081V3.25a.75.75 0 011.5 0v7.831l2.897-2.496a.75.75 0 011.106 1.06l-3 3.25a.75.75 0 01-1.106 0l-3-3.25a.75.75 0 011.106-1.06L10 11.081z"/></svg>
                </span>
              </th>
              <th class="px-6 py-3 cursor-pointer" @click="sort('firstname')">
                {{ $t('admin_panel.manage_users_view.first_name') }}
              </th>
              <th class="px-6 py-3 cursor-pointer" @click="sort('lastname')">
                {{ $t('admin_panel.manage_users_view.last_name') }}
              </th>
              <th class="px-6 py-3 cursor-pointer" @click="sort('email')">
                {{ $t('admin_panel.manage_users_view.email') }}
              </th>
              <th class="px-6 py-3 cursor-pointer" @click="sort('status')">
                {{ $t('admin_panel.manage_users_view.status') }}
              </th>
              <th class="px-6 py-3 cursor-pointer" @click="sort('role')">
                {{ $t('admin_panel.manage_users_view.role') }}
              </th>
              <th class="px-6 py-3">{{ $t('admin_panel.manage_users_view.actions') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="account in sortedAccounts" :key="account.id" class="bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
              <td class="px-6 py-4">{{ account.username }}</td>
              <td class="px-6 py-4">{{ account.firstname }}</td>
              <td class="px-6 py-4">{{ account.lastname }}</td>
              <td class="px-6 py-4">{{ account.email }}</td>
              <td class="px-6 py-4">{{ account.accountStatus }}</td>
              <td class="px-6 py-4">{{ account.role }}</td>
              <td class="px-6 py-4 flex space-x-2">
                <button class="btn btn-secondary flex items-center space-x-2" @click="editAccount(account.id)">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 010 2.828l-9.586 9.586-4.293 1.707 1.707-4.293 9.586-9.586a2 2 0 012.828 0zm-1.414 1.414L6.828 13.172 5 15l1.828-.828 9.172-9.172z"/></svg>
                  <span>{{ $t('admin_panel.manage_users_view.edit') }}</span>
                </button>
                <button class="btn btn-danger flex items-center space-x-2" @click="showDeleteConfirmation(account.id)">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M9 2a1 1 0 00-1 1v1H4a1 1 0 100 2h12a1 1 0 100-2h-4V3a1 1 0 00-1-1H9zm-3 6a1 1 0 011 1v7a1 1 0 102 0v-7a1 1 0 112 0v7a1 1 0 102 0v-7a1 1 0 112 0v7a1 1 0 102 0v-7a1 1 0 011-1h2a1 1 0 100-2h-1a2 2 0 00-2-2H5a2 2 0 00-2 2H2a1 1 0 100 2h1z" clip-rule="evenodd"/></svg>
                  <span>{{ $t('admin_panel.manage_users_view.delete') }}</span>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ConfirmationDialog
      :visible="showConfirmationDialog"
      @confirm="confirmDeleteAccount"
      @cancel="cancelDeleteAccount"
    />
  </div>
</template>

<script>
import AdminPanelSidebar from '../../components/siderbars/AdminPanelSidebar.vue';
import ConfirmationDialog from '../../components/dialogs/ConfirmationDialog.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    AdminPanelSidebar,
    ConfirmationDialog
  },
  data() {
    return {
      sortKey: '',
      sortOrder: 'asc',
      showConfirmationDialog: false,
      userIdToDelete: null
    }
  },
  computed: {
    ...mapState({
      accounts: state => state.admin.accounts
    }),
    sortedAccounts() {
      return this.accounts.slice().sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] < b[this.sortKey]) {
          result = -1;
        } else if (a[this.sortKey] > b[this.sortKey]) {
          result = 1;
        }
        return this.sortOrder === 'asc' ? result : -result;
      });
    }
  },
  methods: {
    ...mapActions('admin', ['fetchAccounts', 'deleteAccount']),
    editAccount(id) {
      this.$router.push(`/admin/modify-user/${id}`);
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    confirmDeleteAccount() {
      this.deleteAccount(this.userIdToDelete);
      this.showConfirmationDialog = false;
      this.userIdToDelete = null;
    },
    cancelDeleteAccount() {
      this.showConfirmationDialog = false;
      this.userIdToDelete = null;
    },
    showDeleteConfirmation(id) {
      this.userIdToDelete = id;
      this.showConfirmationDialog = true;
    },
    navigateToAddUser() {
      this.$router.push('/admin/add-user');
    }
  },
  created() {
    this.fetchAccounts();
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.form-bg {
  background-color: #1b1b1b;
  min-height: 100vh;
}

.actions .btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #2563eb;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-secondary {
  background-color: #3b82f6;
  color: #fff;
  border: none;
}

.btn-secondary:hover {
  background-color: #2563eb;
}

.btn-danger {
  background-color: #ef4444;
  color: #fff;
  border: none;
}

.btn-danger:hover {
  background-color: #dc2626;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 0.375rem;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  text-align: left;
}

thead {
  background-color: #374151;
}

tbody tr {
  transition: background-color 0.2s;
}

tbody tr:hover {
  background-color: #4b5563;
}

td .btn {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-radius: 0.375rem;
  display: inline-flex;
  align-items: center;
}

.sort-icon {
  margin-left: 0.5rem;
}
</style>
