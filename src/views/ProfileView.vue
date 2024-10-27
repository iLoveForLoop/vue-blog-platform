<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { getCurrentUserInfo, getUserPost } from '@/composables/getCollections'
import Post from '@/components/Post.vue'

const store = useStore()
const user = ref(null)
const userPost = ref([])
const isReady = computed(() => store.state.isAuthReady)

const loadUserData = async () => {
  if (store.state.user?.uid) {
    const { user: fetchedUser } = await getCurrentUserInfo(store.state.user.uid)
    user.value = fetchedUser
    const { userPost: fetchedPost } = await getUserPost(store.state.user.uid)
    userPost.value = fetchedPost
  }
}

onMounted(loadUserData)

watch(isReady, ready => {
  if (ready && store.state.user) {
    loadUserData()
  }
})
</script>

<template>
  <div v-if="isReady" class="w-100" style="height: 100vh">
    <div v-if="store.state.user">
      <div
        class="container d-flex bg-dark w-100 overflow-scroll hidebar"
        style="height: 100vh"
      >
        <div class="container" v-if="user">
          <div class="row">
            <div class="col-4 text-center text-center bg-info">
              <i class="bi bi-person-circle p-size" style="color: white"></i>

              <div class="text-light">
                <h2>{{ user.value.displayName }}</h2>
                <p>{{ user.value.email }}</p>
              </div>
            </div>

            <div class="col-8 text-center pt-5 bg-warning">
              <h1>Your Rants</h1>
              <div v-for="post in userPost" :key="post.id">
                <h1 class="text-light">Hey</h1>
                <Post :post="post" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidebar {
  scrollbar-width: none;
}

.p-size {
  font-size: 10em;
}
</style>
