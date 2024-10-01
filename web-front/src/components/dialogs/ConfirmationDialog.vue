<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75" v-if="visible">
    <div class="bg-white rounded-lg p-6 max-w-sm w-full">
      <h2 class="text-xl font-semibold mb-4">{{ $t('confirmation_dialog.title') }}</h2>
      <p class="mb-4">{{ $t('confirmation_dialog.message') }}</p>
      <div class="flex justify-end space-x-4">
        <button @click="confirm" class="btn btn-danger">{{ $t('confirmation_dialog.confirm') }}</button>
        <button @click="cancel" class="btn btn-secondary">{{ $t('confirmation_dialog.cancel') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-danger {
  background-color: #ef4444;
  color: #fff;
  border: none;
}
.btn-danger:hover {
  background-color: #dc2626;
}
.btn-secondary {
  background-color: #3b82f6;
  color: #fff;
  border: none;
}
.btn-secondary:hover {
  background-color: #2563eb;
}
</style>
