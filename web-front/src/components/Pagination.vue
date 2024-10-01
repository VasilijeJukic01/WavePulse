<template>
  <div class="pagination">
    <button
      class="page-button"
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
    >
      {{ $t('pagination.previous') }}
    </button>

    <div class="page-numbers">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="['page-button', { active: page === currentPage }]"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="page-button"
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      {{ $t('pagination.next') }}
    </button>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters('songs', ['currentPage', 'totalPages']),
  },
  methods: {
    ...mapActions('songs', ['fetchAllSongs']),
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchAllSongs({page});
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  font-family: 'Arial', sans-serif;
}

.page-button {
  padding: 8px 16px;
  background-color: #1e1e1e;
  border: 1px solid #333;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.page-button:hover:not(:disabled) {
  background-color: #ff6f61;
  transform: translateY(-2px);
}

.page-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.page-button.active {
  background-color: #ff6f61;
  border-color: #ff6f61;
}

.page-numbers {
  display: flex;
  gap: 10px;
}
</style>
