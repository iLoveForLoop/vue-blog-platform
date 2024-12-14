<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
import Searchbar from './components/Sidebar/Searchbar.vue'
import { ref } from 'vue'
import CreateNewPost from './components/CreateNewPost.vue'

const isCreatingPost = ref(false)

const closeCreatePost = () => {
  isCreatingPost.value = false
}

const openCreatePost = () => {
  isCreatingPost.value = true
}
</script>

<template>
  <CreateNewPost @closeCreatePost="closeCreatePost" v-if="isCreatingPost" />
  <div class="main-bg" style="height: ">
    <div class="d-flex justify-content-center">
      <Sidebar @openCreatePost="openCreatePost" />
      <RouterView />
      <Searchbar />
    </div>
  </div>
</template>


<style scoped>
</style>
