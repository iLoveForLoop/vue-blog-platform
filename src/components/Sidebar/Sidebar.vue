<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const isShow = ref(false)
const router = useRouter()
const store = useStore()

const toggleBar = () => {
  isShow.value = !isShow.value
}

const logout = async () => {
  await store.dispatch('logout')
  router.push('/login')
}

const manageRoute = data => {
  switch (data) {
    case 'rants':
      console.log('rants')
      toggleBar()
      router.push('/home')
      break
    case 'profile':
      console.log('create')
      toggleBar('profile')
      router.push('/profile')
      break
    case 'create':
      toggleBar()
      router.push('/create')
      break
    case 'settings':
      toggleBar()
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
</script>

<template>
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
        <i class="bi bi-house-door"></i>
        Home
      </router-link>
      <router-link
        to="/create"
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('create')"
      >
        <i class="bi bi-pencil-square"></i>
        Create
      </router-link>

      <router-link
        to="/profile"
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('profile')"
      >
        <i class="bi bi-person"></i>
        Profile
      </router-link>

      <router-link
        to="/home"
        class="w-100 py-2 ps-4 sideHover pointer text-light rounded text-decoration-none d-flex align-items-center gap-3 sideBarText"
        @click="manageRoute('settings')"
      >
        <i class="bi bi-gear"></i>
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
  z-index: 10;
}

.r-border {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.sideBarText {
  font-size: 2.5vh;
}
</style>
