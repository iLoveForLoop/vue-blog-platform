<script setup>
import { getSnapCollectionWithUser } from '@/composables/getCollections'
import Post from '@/components/Post.vue'
import Header from '@/components/Header.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'

const showHeader = ref(false)
const store = useStore()

const handleClick = (e) => {
  if (!e.target.closest('.leftbar')) {
    console.log('home handle click')
    console.log(store.state.isSidebarOpen)
    store.commit('setIsSidebarOpen', false)
  }

}

onMounted(() => {
  document.addEventListener('click', handleClick)
  setTimeout(() => {
    showHeader.value = true
  }, 700)
})

const { posts } = getSnapCollectionWithUser()

// const logout = async () => {
//   store.commit('setIsNewUser', false)
//   await store.dispatch('logout')
//   router.push('/login')
// }

// logout()
</script>


<template>

  <div class="position-relative poppins-regular w-75">
    <transition name="pop">
      <Header v-if="showHeader" />
    </transition>

    <div class="px-0 container main-bg overflow-scroll hidebar b-pad m-0" style="height: 100vh">
      <div class="mx-5 my-5 p-5 rounded-5">
        <div class="" v-for="post in posts" :key="post.id">
          <Post :post="post" />
        </div>
      </div>
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

.pop-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pop-enter-from {
  transform: scale(0.5);
  opacity: 0;
}

.pop-enter-to {
  transform: scale(1);
  opacity: 1;
}
</style>
