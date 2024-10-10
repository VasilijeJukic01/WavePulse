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
  padding: 20px;
  background-color: #2b2b2b;
  border-radius: 10px;
  text-align: center;
  color: #f1f1f1;
}

.song-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

h2 {
  font-size: 28px;
  margin: 10px 0;
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
  margin: 15px 0;
}

.genre-chip {
  background-color: #444;
  color: #fff;
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 14px;
}

.rating .star {
  font-size: 30px;
  color: orange;
  margin: 0 5px;
}

.play-count {
  font-size: 18px;
  margin-top: 10px;
}
</style>
