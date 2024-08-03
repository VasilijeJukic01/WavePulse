<template>
  <div class="music-card">
    <div class="image-container">
      <img :src="music.cover" alt="Album Cover" class="album-cover" />
      <button @click="playMusic" class="play-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
      <button @click="viewDetails" class="details-button">Details</button>
    </div>
    <div class="music-details">
      <h3 class="name">{{ music.name }}</h3>
      <div class="artist">{{ music.songArtists[0].Artist.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    music: Object,
  },
  methods: {
    playMusic() {
      console.log(`Playing music: ${this.music.name}`);
    },
    viewDetails() {
      console.log(`Viewing details for: ${this.music.name}`);
    },
  },
};
</script>

<style scoped>
.music-card {
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.music-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.image-container {
  position: relative;
  width: 100%;
  height: 70%;
}

.album-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.play-button,
.details-button {
  position: absolute;
  background-color: rgba(255, 75, 43, 0.8);
  color: white;
  border: none;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s, opacity 0.3s;
  opacity: 0;
  bottom: 10px;
}

.music-card:hover .play-button,
.music-card:hover .details-button {
  opacity: 1;
}

.play-button {
  left: 10px;
  border-radius: 50%;
}

.play-button:hover {
  background-color: rgba(255, 75, 43, 1);
}

.details-button {
  right: 10px;
  border-radius: 4px;
  padding: 5px 10px;
}

.details-button:hover {
  background-color: rgba(255, 75, 43, 1);
}

.music-details {
  padding: 8px;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30%;
}

.name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.artist {
  font-size: 1rem;
  color: #ccc;
}
</style>
