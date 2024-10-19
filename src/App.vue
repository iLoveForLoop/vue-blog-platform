<script setup>
import Sidebar from './components/Sidebar.vue'
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
      <Sidebar />
      <RouterView @checklog="logchecker" />
    </div>
  </div>
</template>


<style scoped>
</style>
