<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import Searchbar from './components/Sidebar/Searchbar.vue'
import { ref } from 'vue'
</script>

<template>
  <div class="main-bg" style="height: ">
    <!-- <Navbar /> -->
    <div class="d-flex justify-content-center">
      <Sidebar />
      <RouterView />
      <Searchbar />
    </div>
  </div>
</template>


<style scoped>
</style>
