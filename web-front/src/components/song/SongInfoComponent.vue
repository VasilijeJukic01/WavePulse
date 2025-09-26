<template>
  <div class="song-info" v-if="song">
    <img :src="song.cover" alt="Song Cover" class="song-cover" />
    <h2>{{ song.name }}</h2>
    <div class="artist-names">
      <span v-for="artist in song.songArtists" :key="artist.Artist.id">{{ artist.Artist.name }}</span>
    </div>
    <p class="year">{{ song.year }}</p>
    <div class="genres">
      <span v-for="genre in song.songGenres" :key="genre.Genre.id" class="genre-chip">{{ genre.Genre.name }}</span>
    </div>
    <div class="rating" @click="openRatingDialog">
      <span v-for="n in 5" :key="n" class="star">
        {{ n <= Math.round(song.averageRating) ? '★' : '☆' }}
      </span>
    </div>
    <p class="play-count">{{ $t('song_details.song_info.total_plays') }}: {{ song.playCount }}</p>
  </div>
</template>

<script>
export default {
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  methods: {
    openRatingDialog() {
      this.$emit('open-rating-dialog');
    }
  }
};
</script>

<style scoped>
.song-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: linear-gradient(145deg, #1e1e1e, #333333);
  border-radius: 15px;
  text-align: center;
  color: #f1f1f1;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  max-width: 450px;
  transition: transform 0.3s ease;
}

.song-cover {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
}

.song-cover:hover {
  transform: scale(1.05);
}

h2 {
  font-size: 28px;
  margin: 12px 0;
  color: #ffffff;
}

.artist-names, .year {
  font-size: 18px;
  margin: 5px 0;
}

.genres {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.genre-chip {
  background-color: #555;
  color: #fff;
  border-radius: 20px;
  padding: 7px 15px;
  font-size: 15px;
}

.rating .star {
  font-size: 32px;
  color: orange;
  margin: 0 6px;
}

.play-count {
  font-size: 18px;
  margin-top: 15px;
}
</style>
