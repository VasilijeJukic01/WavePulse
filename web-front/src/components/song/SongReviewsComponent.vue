<template>
  <div class="reviews">
    <h3><strong>{{ $t('song_details.reviews.reviews') }}</strong></h3>

    <div class="add-review">
      <form @submit.prevent="addReview">
        <textarea v-model="newReview" :placeholder="$t('song_details.reviews.add_review')" required></textarea>
        <button type="submit">{{ $t('song_details.reviews.review') }}</button>
      </form>
    </div>

    <div v-for="review in reviews" :key="review.id" class="review">
      <p class="review-text">{{ review.User.username }}</p>
      <p class="review-text">{{ review.review }}</p>
      <div class="review-likes">
        <button @click="handleLikeReview(review.id)">
          <i class="fas fa-thumbs-up"></i> {{ review.likes }} {{ $t('song_details.reviews.likes') }}
        </button>
        <button @click="handleDislikeReview(review.id)">
          <i class="fas fa-thumbs-down"></i> {{ review.dislikes }} {{ $t('song_details.reviews.dislikes') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    reviews: Array
  },
  data() {
    return {
      newReview: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    ...mapActions('reviews', ['createSongReview', 'likeReview', 'dislikeReview']),
    async addReview() {
      if (this.newReview.trim()) {
        const reviewData = {
          review: this.newReview,
          likes: 0,
          dislikes: 0,
          userId: this.user.id,
          songId: this.$route.params.id
        };
        await this.createSongReview(reviewData);
        this.newReview = '';
      }
    },
    async handleLikeReview(reviewId) {
      await this.likeReview(reviewId);
    },
    async handleDislikeReview(reviewId) {
      await this.dislikeReview(reviewId);
    }
  }
}
</script>

<style scoped>
.reviews {
  background-color: #2b2b2b;
  padding: 30px;
  border-radius: 10px;
}

.reviews h3 {
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
}

.add-review {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
}

.add-review form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.add-review textarea {
  flex-grow: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #3a3a3a;
  color: #ffffff;
  font-size: 16px;
  min-height: 80px;
  resize: vertical;
  margin-bottom: 10px;
}

.add-review button {
  align-self: flex-end;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #007acc;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
}

.add-review button:hover {
  background-color: #005fa3;
}

.review {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #3a3a3a;
}

.review-text {
  font-size: 18px;
  margin-bottom: 15px;
  color: #f1f1f1;
}

.review-likes {
  display: flex;
  gap: 15px;
}

.review-likes button {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
}

.review-likes button:hover {
  color: #007acc;
}

.review-likes i {
  margin-right: 5px;
}
</style>
