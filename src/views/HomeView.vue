<script setup>
import {
  getCollection,
  getSnapCollection,
  getSnapCollectionWithUser,
  userPosts,
} from '@/composables/getCollections'
import Post from '@/components/Post.vue'

const { posts } = getSnapCollectionWithUser()
</script>



<template>
  <div
    class="container bg-dark px-5 overflow-scroll hidebar poppins-regular b-pad"
    style="height: 100vh"
  >
    <!-- <h2 class="text-light text-center">Welcome To Rants</h2> -->
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
      <!-- <button class="btn btn-danger" @click="handleDelete(post.id)">
        Delete
      </button> -->
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
