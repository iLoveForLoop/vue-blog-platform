<script setup>
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'
</script>

<template>
  <div class="bg-dark" style="height: ">
    <Navbar />
    <div class="d-flex justify-content-center">
      <RouterView />
    </div>
  </div>
</template>


<style scoped>
</style>
