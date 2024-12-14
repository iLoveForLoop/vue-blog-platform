<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
import Searchbar from './components/Sidebar/Searchbar.vue'
import { ref } from 'vue'
import CreateNewPost from './components/CreateNewPost.vue'
</script>

<template>
  <CreateNewPost />
  <div class="main-bg" style="height: ">
    <div class="d-flex justify-content-center">
      <Sidebar />
      <RouterView />
      <Searchbar />
    </div>
  </div>
</template>


<style scoped>
</style>
