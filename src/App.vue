<script setup>
import Leftbar from './components/Sidebars/Leftbar.vue'
import Rightbar from './components/Sidebars/Rightbar.vue'



</script>

<template>
  <div class="main-bg">
    <div class="d-flex justify-content-center">
      <Leftbar />
      <RouterView />
      <Rightbar />
    </div>
  </div>
</template>


<style scoped></style>
