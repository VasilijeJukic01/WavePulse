<template>
  <div class="song-details">
    <div class="content-wrapper" v-if="!isLoading">
      <div class="left-section">
        <SongInfoComponent :song="song" />
      </div>
      <div class="right-section">
        <RelatedSongsComponent />
      </div>
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

export default {
  components: {
    SongInfoComponent,
    SongReviewsComponent,
    RelatedSongsComponent
  },
  data() {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapGetters('songs', ['getSongById', 'song']),
    ...mapGetters('reviews', ['songReviews']),
    song() {
      return this.getSongById(this.$route.params.id);
    },
    reviews() {
      return this.songReviews;
    }
  },
  watch: {
    '$route.params.id': 'fetchSongDetails'
  },
  async mounted() {
    await this.fetchSongDetails();
    this.fetchSongReviews(this.$route.params.id);
    this.isLoading = false;
  },
  methods: {
    ...mapActions('songs', ['fetchSongById']),
    ...mapActions('reviews', ['fetchSongReviews']),
    async fetchSongDetails() {
      console.log('Fetching song details...');
      await this.fetchSongById(this.$route.params.id);
    }
  }
}
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
