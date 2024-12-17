<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CreateNewPost from '../CreateNewPost.vue'

const emit = defineEmits(['openCreatePost'])

const router = useRouter()
const store = useStore()
const isCreatingPost = ref(false)

const openCreatePost = () => {
  isCreatingPost.value = true
}

const logout = async () => {
  await store.dispatch('logout')
  router.push('/login')
}

const manageRoute = data => {
  switch (data) {
    case 'rants':
      console.log('rants')

      router.push('/home')
      break
    case 'profile':
      router.push('/profile')
      break
    case 'create':
      console.log('create')
      openCreatePost()
      break
    case 'settings':
      // logout()
      router.push('/')
      break
    // case 'logout':
    //   await store.dispatch('logout')
    //   router.push('/login')
    //   break
  }
}

const isReady = computed(() => store.state.isAuthReady)
const isNewUser = computed(() => store.state.isNewUser)

const closeCreatePost = () => {
  isCreatingPost.value = false
}
</script>

<template>
  <!-- For Styling purposes only -->
  <div
    class="backdrop"
    v-if="isCreatingPost"
    @click.self="closeCreatePost"
  ></div>
  <!-- For Styling purposes only -->

  <!-- Creating Post -->
  <transition name="pop">
    <CreateNewPost
      v-if="isCreatingPost"
      @closeCreatePost="isCreatingPost = false"
    />
  </transition>

  <template v-if="isReady && !isNewUser">
    <div
      class="side-w main-bg d-flex flex-column poppins-regular text-size zindex text-light r-border pe-3 gap-3"
      style="height: 100vh"
      v-if="store.state.user"
    >
      <div
        class="w-100 pt-4 ps-4 d-flex align-items-center justify-content-between"
      >
        <div class="fs-3 logo-font">
          <!-- <i class="bi bi-bootstrap-fill"></i> -->
          Rants
        </div>
      </div>
      <router-link
        to="/home"
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('rants')"
      >
        <i class="bi bi-house-door fs-5"></i>
        Home
      </router-link>
      <a
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('create')"
      >
        <i class="bi bi-pencil-square fs-5"></i>
        Create
      </a>

      <router-link
        to="/profile"
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('profile')"
      >
        <i class="bi bi-person fs-5"></i>
        Profile
      </router-link>

      <router-link
        to="/home"
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('settings')"
      >
        <i class="bi bi-gear fs-5"></i>
        Settings
      </router-link>

      <!-- <div
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="logout"
      >
        <i class="bi bi-box-arrow-left"></i>
        Logout
      </div> -->
    </div>
  </template>
</template>

<style scoped>
.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5) !important;
  top: 0;
  left: 0;
  z-index: 10;
}

.pop-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pop-leave-active {
  transition: none;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
  opacity: 1;
}

.pointer {
  cursor: pointer;
}

.text-size {
  font-size: 1.1em;
}

.sideHover {
  transition: 0.3s ease-in-out;
}

.sideHover:hover {
  background: #605f5f;
}

.side-w {
  width: 30vw;
}

.zindex {
  z-index: 2;
}

.r-border {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.sideBarText {
  font-size: 0.9em;
}
</style>
