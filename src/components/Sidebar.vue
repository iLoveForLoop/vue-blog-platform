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
      router.push('/')
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
      router.push('/')
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
    class="w-25 bg-primary d-flex flex-column poppins-regular text-size position-absolute"
    style="height: 100vh"
    v-if="isShow"
  >
    <div class="w-100 p-3 text-end">
      <i class="bi bi-x-lg pointer" @click="toggleBar"></i>
    </div>
    <router-link
      to="/"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none"
      @click="manageRoute('rants')"
    >
      Rants
    </router-link>
    <router-link
      to="/create"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none"
      @click="manageRoute('create')"
    >
      Create
    </router-link>

    <router-link
      to="/profile"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none"
      @click="manageRoute('profile')"
    >
      Profile
    </router-link>

    <router-link
      to="/"
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none"
      @click="manageRoute('settings')"
    >
      Settings
    </router-link>

    <div
      class="w-100 p-3 ps-4 sideHover pointer text-dark text-decoration-none"
      @click="logout"
    >
      Logout
    </div>
  </div>

  <div v-else class="fs-2 d-flex align-items-center ms-5">
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
  background: #fff;
}
</style>
