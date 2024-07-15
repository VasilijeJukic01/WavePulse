<template>
  <div class="custom-bg h-screen bg-gray-200 flex items-center justify-center">
    <div class="bg-white w-3/4 h-3/4 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
      <div class="w-full h-2/3">
        <!--<img :src="require('@/assets/background.jpg')" alt="Background" class="w-full h-full object-cover"> -->
      </div>
      <div class="w-full h-1/3 flex flex-col items-center justify-center p-4 space-y-4">
        <h1 class="text-3xl font-bold text-gray-700">Welcome to WavePulse</h1>
        <p class="text-lg text-gray-500">Explore your dream songs!</p>
        <router-link to="/destinations" class="px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">Explore</router-link>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.custom-bg {
  background: url('~@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
