<template>
  <div class="flex min-h-screen bg-gray-900">
    <ArtistPanelSidebar />
    <div class="flex-1 artist-analytics py-8 px-4 sm:px-6 lg:px-8">
      <h2>{{ $t('artist_panel.artist_analytics.title') }}</h2>
      <div class="charts">
        <div class="chart-container">
          <canvas id="averageRatingsChart"></canvas>
        </div>
        <div class="chart-container">
          <canvas id="ratingsOverTimeChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Chart, registerables } from 'chart.js';
import ArtistPanelSidebar from "@/components/siderbars/ArtistPanelSidebar.vue";

Chart.register(...registerables);

export default {
  components: {
    ArtistPanelSidebar
  },
  data() {
    return {
      averageRatingsChart: null,
      ratingsOverTimeChart: null
    };
  },
  computed: {
    ...mapGetters('artist', ['averageRatingsBySong', 'ratingsOverTime']),
    ...mapGetters(['user'])
  },
  methods: {
    ...mapActions('artist', ['fetchArtistRatings']),
    renderCharts() {
      // Average Ratings by Song (Bar Chart)
      const avgRatingsCtx = document.getElementById('averageRatingsChart').getContext('2d');
      this.averageRatingsChart = new Chart(avgRatingsCtx, {
        type: 'bar',
        data: {
          labels: this.averageRatingsBySong.map(r => r.name), // Use song name
          datasets: [{
            label: 'Average Rating',
            data: this.averageRatingsBySong.map(r => r.averageRating),
            backgroundColor: '#801c64',
            borderColor: '#801c64',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#555555'
              },
              ticks: {
                color: '#ecf0f1'
              }
            },
            x: {
              ticks: {
                color: '#ecf0f1'
              },
              grid: {
                color: '#555555'
              }
            }
          }
        }
      });

      // Ratings Over Time (Line Chart)
      const ratingsOverTimeCtx = document.getElementById('ratingsOverTimeChart').getContext('2d');
      this.ratingsOverTimeChart = new Chart(ratingsOverTimeCtx, {
        type: 'line',
        data: {
          labels: this.ratingsOverTime.map(r => r.date),
          datasets: [{
            label: 'Average Rating Over Time',
            data: this.ratingsOverTime.map(r => r.averageRating),
            backgroundColor: 'rgba(255,116,0,0.2)',
            borderColor: '#e3620f',
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#ecf0f1'
              }
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.raw.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: '#555555'
              },
              ticks: {
                color: '#ecf0f1'
              }
            },
            x: {
              ticks: {
                color: '#ecf0f1'
              },
              grid: {
                color: '#555555'
              }
            }
          }
        }
      });
    },
    handleResize() {
      if (this.averageRatingsChart) {
        this.averageRatingsChart.resize();
      }
      if (this.ratingsOverTimeChart) {
        this.ratingsOverTimeChart.resize();
      }
    }
  },
  async mounted() {
    await this.fetchArtistRatings(this.user.id);
    this.renderCharts();
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
};
</script>

<style scoped>
.artist-analytics {
  padding: 20px;
  background-color: #222222;
  border-radius: 10px;
  color: #ecf0f1;
  font-family: Arial, sans-serif;
}

.charts {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.chart-container {
  flex: 1;
  padding: 10px;
  max-width: 45%;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 1.8em;
  color: #ecf0f1;
}

canvas {
  width: 100%;
  height: auto;
}
</style>
