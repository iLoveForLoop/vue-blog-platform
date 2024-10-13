<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { ref } from 'vue'

const isLoggedIn = ref(false)

const logchecker = data => {
  isLoggedIn.value = data
}
</script>

<template>
  <div class="bg-secondary" style="height: 100vh">
    <Navbar v-if="isLoggedIn" />
    <RouterView @checklog="logchecker" />
  </div>
</template>


<style scoped>
</style>
