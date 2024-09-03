<template>
  <div class="artist-analytics">
    <h2>Artist Analytics</h2>
    <canvas id="averageRatingsChart"></canvas>
    <canvas id="ratingsOverTimeChart"></canvas>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Line } from 'chart.js';

export default {
  computed: {
    ...mapGetters('artist', ['averageRatingsBySong', 'ratingsOverTime']),
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions('artist', ['fetchArtistRatings']),
    renderCharts() {
      // Average Ratings by Song
      const avgRatingsCtx = document.getElementById('averageRatingsChart').getContext('2d');
      new Line(avgRatingsCtx, {
        type: 'bar',
        data: {
          labels: this.averageRatingsBySong.map(r => `Song ${r.songId}`),
          datasets: [{
            label: 'Average Rating',
            data: this.averageRatingsBySong.map(r => r.averageRating),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
            }
          }
        }
      });

      // Ratings Over Time
      const ratingsOverTimeCtx = document.getElementById('ratingsOverTimeChart').getContext('2d');
      new Line(ratingsOverTimeCtx, {
        type: 'line',
        data: {
          labels: this.ratingsOverTime.map(r => r.date),
          datasets: [{
            label: 'Average Rating',
            data: this.ratingsOverTime.map(r => r.averageRating),
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              max: 5,
            }
          }
        }
      });
    }
  },
  async mounted() {
    await this.fetchArtistRatings(this.user.id);
    this.renderCharts();
  }
};
</script>

<style scoped>
.artist-analytics {
  margin: 20px;
}

canvas {
  max-width: 100%;
}
</style>
