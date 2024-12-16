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
  <!-- For Styling purposes only -->
  <div
    class="backdrop"
    v-if="isCreatingPost"
    @click.self="closeCreatePost"
  ></div>
  <!-- For Styling purposes only -->
  <transition name="pop">
    <CreateNewPost @closeCreatePost="closeCreatePost" v-if="isCreatingPost" />
  </transition>

  <div class="main-bg" style="height: ">
    <div class="d-flex justify-content-center">
      <Sidebar @openCreatePost="openCreatePost" />
      <RouterView />
      <Searchbar />
    </div>
  </div>
</template>


<style scoped>
.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5) !important;
  top: 0;
  left: 0;
  z-index: 10;
}

.pop-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pop-leave-active {
  transition: none;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
