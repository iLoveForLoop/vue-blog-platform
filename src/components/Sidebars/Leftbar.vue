<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CreateNewPost from '../CreateNewPost.vue'
import Notificationbar from './Notificationbar.vue'

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

// onMounted(() => {
//   store.commit('setIsOnProfile', true)
// })

// onUnmounted(() => {
//   store.commit('setIsOnProfile', false)
// })

const manageRoute = data => {
  switch (data) {
    case 'rants':
      store.commit('setIsOnProfile', false)
      router.push('/home')
      break
    case 'profile':
      store.commit('setIsOnProfile', true)
      router.push('/profile')
      break
    case 'create':
      console.log('create')
      openCreatePost()
      break
    case 'settings':
      console.log('settings clicked')
      break
  }
}

const isReady = computed(() => store.state.isAuthReady)
const isNewUser = computed(() => store.state.isNewUser)



const isThereNewNotif = computed(() => store.state.isThereNewNotif)
const newNotif = computed(() => isThereNewNotif.value ? 'small-red-circle' : '')
console.log('From leftbar notif: ', isThereNewNotif.value)


const closeCreatePost = () => {
  isCreatingPost.value = false
}

const closeOnEscape = e => {
  if (isCreatingPost.value && e.key === 'Escape') {
    console.log('click the escape in the create post')
    closeCreatePost()
  }
}

// store.commit('setIsThereNewNotif', true)




onMounted(() => document.addEventListener('keydown', closeOnEscape)
)
onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))

const isViewingNotification = computed(() => store.state.isSidebarOpen)


const toggleNotification = () => {


  store.commit('setIsSidebarOpen', !store.state.isSidebarOpen)
  console.log('handle click in the left bar')
  console.log(store.state.isSidebarOpen)
}




</script>

<template>
  <!-- For Styling purposes only -->
  <div class="backdrop" v-if="isCreatingPost" @click.self="closeCreatePost"></div>
  <!-- For Styling purposes only -->

  <!-- Creating Post -->
  <transition name="pop">
    <CreateNewPost v-if="isCreatingPost" @closeCreatePost="isCreatingPost = false" />
  </transition>



  <template v-if="isReady && !isNewUser">
    <div
      class="leftbar main-bg d-flex flex-column poppins-regular text-size zindex text-light r-border px-2   gap-3 possition-relative"
      style="height: 100vh" v-if="store.state.user">
      <transition name="slide">
        <Notificationbar v-if="isViewingNotification" @closebar="toggleNotification" />
      </transition>

      <div class="w-100 pt-4 ps-3 d-flex align-items-center justify-content-between ">

        <div class="fs-3 logo-font">
          <!-- <i class="bi bi-bootstrap-fill"></i> -->
          Rants
        </div>
      </div>
      <router-link to="/home"
        class="w-100 py-2 ps-3 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center justify-content-start gap-3 sideBarText"
        @click="manageRoute('rants')">

        <i class="bi bi-house-door fs-5"></i>
        Home
      </router-link>
      <a class="w-100 py-2 ps-3 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('')">
        <i class="bi bi-search fs-5"></i>
        Search
      </a>
      <a class="w-100 py-2 ps-3 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('create')">
        <i class="bi bi-pencil-square fs-5"></i>
        Create
      </a>
      <a class="w-100 py-2 ps-3 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText position-relative"
        @click="toggleNotification">
        <div class="bg-danger position-absolute" :class="newNotif">

        </div>
        <i class="bi bi-heart fs-5"></i>
        Notifications
      </a>
      <router-link to="/profile"
        class="w-100 py-2 ps-3 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('profile')">
        <i class="bi bi-person fs-5"></i>
        Profile
      </router-link>

      <a class="w-100 py-2 ps-3 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('settings')">
        <i class="bi bi-gear fs-5"></i>
        Settings
      </a>

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
  max-width: 250px;
  min-width: 250px;
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

a {
  padding: 3.5em;
}

.slide-enter-active {
  opacity: 0;
  transform: translateX(-75%);
  transition: 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter {
  transform: translateX(-75%);
  /* Start position off-screen */
  opacity: 0;
  /* Optional: fade in along with the slide */
}

.slide-leave-to {
  transform: translateX(-75%);
  opacity: 0;
  /* Optional: fade out along with the slide */
}

.small-red-circle {
  height: 10px;
  width: 10px;
  position: absolute;
  border-radius: 50%;
  top: 0.7em;
  left: 2em;
  z-index: 10;
}
</style>
