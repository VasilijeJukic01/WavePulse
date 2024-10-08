<template>
  <div class="music-card">
    <div class="image-container">
      <img :src="music.cover || require('@/assets/default_cover.jpg')" alt="Album Cover" class="album-cover" />
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
    <div v-if="playerReady" class="spotify-player" ref="spotifyPlayer" style="position: fixed; bottom: 0; width: 100%;"></div>
  </div>
</template>

<script>
// TODO: Move to Vuex & Find API or use AWS S3
import axios from "axios";

export default {
  props: {
    music: Object,
  },
  data() {
    return {
      player: null,
      playerReady: false,
    };
  },
  methods: {
    async playMusic() {
      const songName = this.music.name;
      const artistName = this.music.songArtists[0].Artist.name;

      try {
        const accessToken = await this.getAccessToken();
        const response = await axios({
          url: `https://api.spotify.com/v1/search`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: `track:${songName} artist:${artistName}`,
            type: 'track',
            limit: 1,
          },
        });

        const tracks = response.data.tracks.items;
        if (tracks.length > 0) {
          const track = tracks[0];
          this.loadSpotifySDK().then(() => {
            this.initSpotifyPlayer(accessToken, track.uri);
          });
        } else {
          console.error("No track found on Spotify.");
        }
      } catch (error) {
        console.error("Error fetching track from Spotify:", error);
      }
    },

    async getAccessToken() {
      return axios({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            btoa(`${process.env.VUE_APP_SPOTIFY_CLIENT_ID}:${process.env.VUE_APP_SPOTIFY_CLIENT_SECRET}`),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: "grant_type=client_credentials",
      }).then((response) => response.data.access_token);
    },

    loadSpotifySDK() {
      return new Promise((resolve) => {
        if (window.Spotify) {
          resolve();
        } else {
          window.onSpotifyWebPlaybackSDKReady = () => {
            resolve();
          };
          const script = document.createElement("script");
          script.src = "https://sdk.scdn.co/spotify-player.js";
          document.head.appendChild(script);
        }
      });
    },

    initSpotifyPlayer(accessToken, trackUri) {
      if (!window.Spotify) {
        console.error("Spotify SDK still not loaded.");
        return;
      }

      if (!this.player) {
        this.player = new Spotify.Player({
          name: "Your Web Player",
          getOAuthToken: (cb) => cb(accessToken),
          volume: 0.8,
        });

        // Ready
        this.player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          this.playerReady = true;
          this.transferPlaybackHere(device_id, trackUri, accessToken);
        });

        // Error handling
        this.player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        this.player.connect();
      }
    },

    transferPlaybackHere(device_id, trackUri, accessToken) {
      axios({
        url: `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          uris: [trackUri],
        },
      }).catch((error) => {
        console.error("Error starting playback:", error);
      });
    },

    viewDetails() {
      this.$router.push({ name: "SongDetails", params: { id: this.music.id } });
    },
  },
};
</script>

<style scoped>
.spotify-player {
  height: 80px;
  background-color: #1db954;
  color: white;
}
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
