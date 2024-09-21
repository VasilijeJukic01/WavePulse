<template>
  <div class="reviews">
    <h3><strong>Reviews</strong></h3>
    <div v-for="review in reviews" :key="review.id" class="review">
      <p class="review-text">{{ review.review }}</p>
      <div class="review-likes">
        <button @click="likeReview(review.id)">
          <i class="fas fa-thumbs-up"></i> {{ review.likes }}
        </button>
        <button @click="dislikeReview(review.id)">
          <i class="fas fa-thumbs-down"></i> {{ review.dislikes }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  props: {
    reviews: Array
  },
  methods: {
    ...mapActions('reviews', ['likeReview', 'dislikeReview'])
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
