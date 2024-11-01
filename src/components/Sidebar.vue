<script setup>
import { ref } from 'vue'
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
      router.push('/home')
      break
    // case 'logout':
    //   await store.dispatch('logout')
    //   router.push('/login')
    //   break
  }
}
</script>

<template>
  <div
    class="side-w bg-light d-flex flex-column poppins-regular text-size position-absolute"
    style="height: 100vh"
    v-if="isShow"
  >
    <div
      class="w-100 p-3 ps-4 d-flex align-items-center justify-content-between"
    >
      <div class="fs-4">
        <i class="bi bi-bootstrap-fill"></i>
        Rants
      </div>

      <i class="bi bi-x-lg pointer fs-5" @click="toggleBar"></i>
    </div>
    <router-link
      to="/home"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none d-flex align-items-center justify-content-between"
      @click="manageRoute('rants')"
    >
      Rants
      <i class="bi bi-house-door"></i>
    </router-link>
    <router-link
      to="/create"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none d-flex align-items-center justify-content-between"
      @click="manageRoute('create')"
    >
      Create
      <i class="bi bi-pencil-square"></i>
    </router-link>

    <router-link
      to="/profile"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none d-flex align-items-center justify-content-between"
      @click="manageRoute('profile')"
    >
      Profile
      <i class="bi bi-person"></i>
    </router-link>

    <router-link
      to="/home"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none d-flex align-items-center justify-content-between"
      @click="manageRoute('settings')"
    >
      Settings
      <i class="bi bi-gear"></i>
    </router-link>

    <div
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none d-flex align-items-center justify-content-between"
      @click="logout"
    >
      Logout
      <i class="bi bi-box-arrow-left"></i>
    </div>
  </div>

  <div v-show="!isShow" class="fs-2 d-flex align-items-center ms-5">
    <i class="bi bi-list pointer" @click="toggleBar"></i>
  </div>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}

.text-size {
  font-size: 1.1em;
}

.sideHover {
  transition: 0.2s ease-in-out;
}

.sideHover:hover {
  background: #a7a6a6;
}

.side-w {
  width: 15%;
}
</style>
