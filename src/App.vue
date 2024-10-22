<script setup>
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'

const isLoggedIn = ref(false)

const logchecker = data => {
  isLoggedIn.value = data
}
</script>

<template>
  <div class="bg-secondary" style="height: 100vh">
    <Navbar />
    <div class="d-flex justify-content-center">
      <RouterView @checklog="logchecker" />
    </div>
  </div>
</template>


<style scoped>
</style>
