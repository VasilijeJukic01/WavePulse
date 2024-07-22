<template>
  <div class="custom-bg h-screen flex items-center justify-center">
    <div class="bg-white w-11/12 md:w-3/4 lg:w-1/2 h-3/4 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
      <div class="w-full h-1/3 flex flex-col items-center justify-center p-4 space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">Welcome to WavePulse</h1>
        <p class="text-lg text-gray-500">Explore your dream songs!</p>
        <router-link to="/destinations" class="px-8 py-3 bg-indigo-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105">Explore</router-link>
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
