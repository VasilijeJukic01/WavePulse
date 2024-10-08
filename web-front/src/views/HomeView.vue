<template>
  <div class="home-view">
    <div class="container">
      <h1 class="main-title">{{ $t('home_view.discover') }}</h1>
      <div class="music-grid">
        <MusicCard
          v-for="song in songs"
          :key="song.id"
          :music="{
            id: song.id,
            cover: song.cover,
            name: song.name,
            songArtists: song.songArtists,
            songGenres: song.songGenres,
            year: song.year,
            duration: song.duration
          }"
        />
      </div>
      <Pagination />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import MusicCard from '@/components/MusicCard.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    MusicCard,
    Pagination
  },
  computed: {
    ...mapGetters('songs', ['songs']),
  },
  async created() {
    await this.fetchTotalSongs();
    await this.fetchAllSongs();
  },
  methods: {
    ...mapActions('songs', ['fetchTotalSongs', 'fetchAllSongs']),
  }
}
</script>

<style scoped>
.home-view {
  background-color: #181818;
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  font-size: 2.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 40px;
}

.music-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
