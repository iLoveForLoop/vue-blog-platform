<script setup>
import { getSnapCollectionWithUser } from '@/composables/getCollections'
import Post from '@/components/Post.vue'

const { posts } = getSnapCollectionWithUser()
</script>



<template>
  <div
    class="container bg-dark px-5 overflow-scroll hidebar poppins-regular b-pad"
    style="height: 100vh"
  >
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
    </div>
  </div>
</template>

<style scoped>
.hidebar {
  scrollbar-width: none;
}

.b-pad {
  padding-bottom: 10%;
}
</style>
