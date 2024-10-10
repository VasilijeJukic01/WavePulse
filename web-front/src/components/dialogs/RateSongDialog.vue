<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75" v-if="visible">
    <div class="bg-white rounded-lg p-8 max-w-sm w-full justify-center">
      <h2 class="text-xl font-semibold mb-4 song-title">{{ songTitle }}</h2>

      <div v-if="existingRating > 0" class="text-sm text-gray-600 mb-4 text-center">
        {{ $t('song_details.rating.already_rated_1', { rating: existingRating }) }}<br>
        {{ $t('song_details.rating.already_rated_2') }}
      </div>

      <div class="stars mb-4">
        <span v-for="n in 5" :key="n" @click="setRating(n)" class="star" :class="{ filled: n <= rating }">
          ★
        </span>
      </div>
      <div class="flex justify-center space-x-4">
        <button @click="cancel" class="btn btn-secondary">{{ $t('song_details.rating.cancel') }}</button>
        <button @click="submitRating" class="btn btn-primary">{{ $t('song_details.rating.rate_song') }}</button>
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
    },
    songId: {
      type: Number,
      required: true
    },
    songTitle: {
      type: String,
      required: true
    },
    existingRating: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      rating: this.existingRating
    };
  },
  watch: {
    existingRating(newRating) {
      this.rating = newRating;
    }
  },
  methods: {
    setRating(value) {
      this.rating = value;
    },
    submitRating() {
      this.$emit('submit', { songId: this.songId, rating: this.rating });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};

</script>

<style scoped>
.stars {
  display: flex;
  justify-content: center;
  font-size: 30px;
  color: #ccc;
}
.star {
  cursor: pointer;
  margin: 0 5px;
}
.star.filled {
  color: orange;
}
.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}
.btn-primary {
  background-color: #3b82f6;
  color: #fff;
  border: none;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-secondary {
  background-color: #6b7280;
  color: #fff;
  border: none;
}
.btn-secondary:hover {
  background-color: #4b5563;
}
.song-title {
  color: #333;
  text-align: center;
}
</style>
