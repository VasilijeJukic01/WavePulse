<template>
  <div class="relative" ref="searchBar">
    <input
      type="text"
      :placeholder="$t('header.search_placeholder')"
      v-model="searchQuery"
      @input="debouncedSearch"
      @focus="showResults = true"
      class="bg-gray-800 text-gray-300 py-2 pl-4 pr-10 rounded-full focus:outline-none focus:bg-gray-700 search-text"
    />
    <button class="absolute top-1/2 right-0 transform -translate-y-1/2 mr-4 text-gray-400 hover:text-white">
      <i class="fas fa-search"></i>
    </button>
    <ul v-if="showResults && resultSongs.length" class="absolute z-50 mt-2 bg-gray-800 w-full max-h-60 overflow-y-auto rounded-md shadow-lg">
      <li v-for="(song, index) in resultSongs" :key="index" class="p-4 hover:bg-gray-700 flex items-start space-x-4">
        <img :src="song.cover || require('@/assets/default_cover.jpg')" alt="Song cover" class="w-16 h-16 rounded-full" />
        <div class="text-gray-300 flex-1">
          <p class="font-semibold text-lg">{{ song.name }}</p>
          <p class="text-sm">Artists: {{ song.joinedArtists }}</p>
          <p class="text-sm">Genres: {{ song.joinedGenres }}</p>
          <p class="text-sm">Rating: {{ song.averageRating }} / 5</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce } from '@/store/utils/util';

export default {
  name: 'SearchBar',
  data() {
    return {
      searchQuery: '',
      showResults: false,
    };
  },
  computed: {
    ...mapGetters('songs', ['filteredSongs']),
    resultSongs() {
      return this.filteredSongs;
    },
  },
  methods: {
    ...mapActions('songs', ['searchSongs']),
    onSearch() {
      this.searchSongs(this.searchQuery);
    },
    debouncedSearch: debounce(function() {
      this.onSearch();
    }, 400),
    handleClickOutside(event) {
      if (!this.$refs.searchBar.contains(event.target)) {
        this.showResults = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style scoped>
input::placeholder {
  color: #9ca3af;
}
.search-text:hover {
  color: white;
}
input[type="text"] {
  width: 30vw;
}
.search-text {
  background-color: #202020;
}
.search-text:focus {
  background-color: #333333;
}
ul {
  width: 100%;
  background-color: #333333;
}
li {
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
img {
  border-radius: 50%;
  margin-right: 10px;
}
p {
  margin: 0;
}
p.text-sm {
  color: #9ca3af;
}
</style>
