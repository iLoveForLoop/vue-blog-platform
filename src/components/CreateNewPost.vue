<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getCurrentUserInfo } from '@/composables/getCollections'

const store = useStore()
const email = computed(() => store.state.user.email)
const isReady = computed(() => store.state.isAuthReady)
const user = ref(null)

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
  <div
    class="backdrop d-flex flex-column justify-content-center align-items-center poppins-regular"
  >
    <div
      class="text-light text-center p-3 rounded-top main-bg"
      style="width: 40%"
    >
      <p class="m-0">Create a new post</p>
    </div>
    <div
      class="rounded-bottom bg-gray d-flex"
      style="height: 65vh; width: 40%"
      v-if="user"
    >
      <form
        @submit.prevent="handleSubmit"
        class="d-flex flex-column justify-content-between gap-5 w-100 p-3 pb-4"
      >
        <div class="d-flex flex-column flex-grow-1 w-100">
          <div class="d-flex justify-content-start align-items-center gap-3">
            <img
              class="create-circle"
              :src="
                user.value?.photoURL
                  ? user.value?.photoURL
                  : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
              "
              alt="user"
              @click="toggleProfileChange"
            />
            <p class="m-0 text-light" style="font-size: 1em">{{ email }}</p>
          </div>

          <textarea
            class="form-control w-100 bg-transparent no-border text-light px-3 mt-3 flex-grow-1"
          ></textarea>
        </div>

        <p class="text-info m-0 text-end">Share</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;
}

.bg-gray {
  background: rgb(52, 51, 51);
}

.no-border {
  outline: none !important;
  box-shadow: none !important;
  border: none;
  resize: none;
  caret-color: white;
  font-size: 1em;
}

.create-circle {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
}

.custom-border {
  border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 0 !important;
}
</style>
