<template>
  <div class="song-details">
    <div class="content-wrapper" v-if="!isLoading">
      <div class="left-section">
        <SongInfoComponent :song="song" @open-rating-dialog="isRateDialogVisible = true" />
      </div>
      <div class="right-section">
        <RelatedSongsComponent />
      </div>
      <RateSongDialog :visible="isRateDialogVisible" :songId="song.id" :songTitle="song.name" :existingRating="userRating"  @submit="handleRatingSubmit" @cancel="isRateDialogVisible = false" />
    </div>
    <div class="reviews-section" v-if="!isLoading">
      <SongReviewsComponent :reviews="reviews" />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SongInfoComponent from '@/components/song/SongInfoComponent.vue';
import SongReviewsComponent from '@/components/song/SongReviewsComponent.vue';
import RelatedSongsComponent from '@/components/song/RelatedSongsComponent.vue';
import RateSongDialog from "@/components/dialogs/RateSongDialog.vue";

export default {
  components: {
    RateSongDialog,
    SongInfoComponent,
    SongReviewsComponent,
    RelatedSongsComponent
  },
  data() {
    return {
      isLoading: true,
      isRateDialogVisible: false,
      userRating: 0
    };
  },
  computed: {
    ...mapGetters('songs', ['song']),
    ...mapGetters('reviews', ['songReviews']),
    reviews() {
      return this.songReviews;
    }
  },
  watch: {
    '$route.params.id': 'fetchSongDetails'
  },
  async mounted() {
    await this.fetchSongDetails();
    this.isLoading = false;
  },
  methods: {
    ...mapActions('songs', ['fetchSongById', 'fetchUserRating']),
    ...mapActions('reviews', ['fetchSongReviews']),
    async fetchSongDetails() {
      try {
        console.log('Fetching song details...');
        const userId = this.$store.state.user.user.id;

        await this.fetchSongById(this.$route.params.id);

        const response = await this.fetchUserRating({ songId: this.$route.params.id, userId });

        this.userRating = response ? response.rate : 0;
      } catch (error) {
        console.error('Error fetching song details or user rating:', error);
      }
    },
    async handleRatingSubmit({ songId, rating }) {
      try {
        console.log(`Submitting rating of ${rating} for song ${songId}`);
        this.isRateDialogVisible = false;

        await this.$store.dispatch('songs/rateSong', { songId, rating });

        await this.fetchSongDetails();
      } catch (error) {
        console.error('Failed to submit rating:', error);
      }
    }
  }
};


</script>

<style scoped>
.song-details {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px;
  background-color: #1e1e1e;
  color: #f1f1f1;
}

.content-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.left-section, .right-section {
  flex: 1;
}

.reviews-section {
  padding: 30px;
  background-color: #2b2b2b;
  border-radius: 10px;
}

.genre-chip {
  background-color: #444;
  color: #fff;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
}

.rating .star {
  font-size: 28px;
  color: #ffd700;
}

.review-likes button {
  background: none;
  border: none;
  color: #00b0ff;
  cursor: pointer;
}

.review-likes button:hover {
  color: #007acc;
}

.review {
  border-bottom: 1px solid #444;
  padding: 15px 0;
}
</style>
