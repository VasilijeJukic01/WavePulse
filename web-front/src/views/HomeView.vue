<template>
  <div class="home-view">
    <div class="container">
      <h1 class="main-title">Recommended</h1>
      <div class="music-grid">
        <MusicCard
          v-for="song in songs"
          :key="song.id"
          :music="{
            cover: song.cover,
            name: song.name,
            songArtists: song.songArtists,
            songGenres: song.songGenres,
            year: song.year,
            duration: song.duration
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MusicCard from '@/components/MusicCard.vue';

export default {
  components: {
    MusicCard
  },
  computed: {
    ...mapGetters(['songs'])
  },
  created() {
    this.$store.dispatch('fetchSongs');
  }
}
</script>

<style scoped>
.home-view {
  background-color: #181818; /* Slightly lighter black */
  min-height: 100vh;
  padding: 20px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
}
.main-title {
  font-size: 2.5rem;
  color: #ffffff; /* White text for high contrast */
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
