<script setup>
import { getSnapCollectionWithUser } from '@/composables/getCollections'
import Post from '@/components/Post.vue'
import ViewPost from '@/components/ViewPost.vue'
import { ref } from 'vue'

const { posts } = getSnapCollectionWithUser()
</script>



<template>
  <div
    class="w-100 px-0 container main-bg overflow-scroll hidebar poppins-regular b-pad m-0"
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
