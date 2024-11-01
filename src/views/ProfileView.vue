<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
import {
  getCurrentUserInfo,
  getSnapCollectionWithUser,
} from '@/composables/getCollections'
import Post from '@/components/Post.vue'
import EditPost from '@/components/EditPost.vue'

const store = useStore()
const user = ref(null)

const isReady = computed(() => store.state.isAuthReady)
const { posts } = getSnapCollectionWithUser()

const loadUserData = async () => {
  if (store.state.user?.uid) {
    const { user: fetchedUser } = await getCurrentUserInfo(store.state.user.uid)
    user.value = fetchedUser
  }
}

onMounted(async () => {
  await loadUserData()
})

watch(isReady, ready => {
  if (ready && store.state.user) {
    loadUserData()
  }
})
</script>

<template>
  <div v-if="isReady" class="w-100 poppins-regular" style="height: 100vh">
    <div v-if="store.state.user">
      <div
        class="container d-flex bg-dark w-100 overflow-scroll hidebar"
        style="height: 100vh"
      >
        <div class="container" v-if="user">
          <div class="row">
            <div class="col-4 text-center text-center">
              <i class="bi bi-person-circle p-size" style="color: white"></i>

              <div class="text-light">
                <h2>{{ user.value.displayName }}</h2>
                <p>{{ user.value.email }}</p>
              </div>
            </div>

            <div
              class="col-8 text-center pt-5 p-b overflow-scroll hidebar"
              style="height: 100vh"
            >
              <h1 class="text-light">Your Rants</h1>
              <div v-for="post in posts" :key="post.id">
                <Post
                  :post="post"
                  v-if="post.user_id == user.value.id"
                  :isFromProfile="true"
                />
                <!-- <EditPost :post="post" v-if="store.state.toggleEdit" /> -->
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

.p-b {
  padding-bottom: 5.5em;
}
</style>
