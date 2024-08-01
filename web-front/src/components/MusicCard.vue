<template>
  <div class="music-card">
    <img :src="music.cover" alt="Album Cover" class="album-cover">
    <div class="music-details">
      <h3 class="name">{{ music.name }}</h3>
      <div class="artists">
        <div v-for="(artist, index) in music.songArtists" :key="index">
          {{ artist.Artist.name }}
        </div>
      </div>
      <div class="genres">
        <div v-for="(genre, index) in music.songGenres" :key="index">
          {{ "Genres: " + genre.Genre.name }}
        </div>
      </div>
      <p class="year">{{ "Release: " + music.year }}</p>
      <p class="duration">{{ "Duration: " + music.duration + "s" }}</p>
    </div>
    <div class="actions">
      <button @click="playMusic" class="play-button">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    music: Object
  },
  methods: {
    playMusic() {
      console.log(`Playing music: ${this.music.name}`);
    }
  }
}
</script>

<style scoped>
.music-card {
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.music-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
.album-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.music-details {
  padding: 16px;
  text-align: center;
}
.name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}
.artists, .genres {
  font-size: 1rem;
  margin-bottom: 10px;
}
.year, .duration {
  font-size: 0.9rem;
  color: #999;
}
.actions {
  padding: 16px;
  text-align: center;
}
.play-button {
  background-color: #ff4b2b;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.play-button:hover {
  background-color: #ff3a1b;
}
</style>
