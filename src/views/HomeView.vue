<script setup>
import { getCollection, getSnapCollection } from '@/composables/getCollections'
import { deletePost } from '@/composables/deletePost'
import Post from '@/components/Post.vue'

const { posts } = getSnapCollection()

const handleDelete = id => {
  deletePost(id)
}
</script>



<template>
  <div
    class="container bg-dark p-5 overflow-scroll hidebar"
    style="height: 100vh"
  >
    <h2 class="text-light">Home Rants</h2>
    <div v-for="post in posts" :key="post.id">
      <Post :post="post" />
      <button class="btn btn-danger" @click="handleDelete(post.id)">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.mr {
  margin-right: 8em;
}

.hidebar {
  scrollbar-width: none;
}
</style>
