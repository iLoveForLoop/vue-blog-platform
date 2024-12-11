<script setup>
import { getSnapCollectionWithUser } from '@/composables/getCollections'
import Post from '@/components/Post.vue'

const { posts } = getSnapCollectionWithUser()

// import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'

// const router = useRouter()
// const store = useStore()
// const logout = async () => {
//   await store.dispatch('logout')
//   router.push('/login')
// }

// logout()
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
