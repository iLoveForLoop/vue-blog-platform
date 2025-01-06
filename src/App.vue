<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
import Searchbar from './components/Sidebar/Searchbar.vue'



</script>

<template>
  <div class="main-bg">
    <div class="d-flex justify-content-center">
      <Sidebar />
      <RouterView />
      <Searchbar />
    </div>
  </div>
</template>


<style scoped></style>
