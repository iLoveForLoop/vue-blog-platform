<script setup>
import { ref } from 'vue'

const isShow = ref(true)

const toggleBar = () => {
  isShow.value = !isShow.value
}
</script>

<template>
  <div
    class="w-25 bg-secondary d-flex flex-column poppins-regular text-size"
    style="height: 100vh"
    v-if="isShow"
  >
    <div class="w-100 p-3 bg-secondary text-end">
      <i class="bi bi-x-lg pointer" @click="toggleBar"></i>
    </div>
    <router-link
      to="/"
      class="w-100 p-3 sideHover pointer text-dark text-decoration-none"
    >
      Rants
    </router-link>
    <router-link
      to="/create"
      class="w-100 p-3 sideHover pointer text-dark text-decoration-none"
    >
      Create
    </router-link>

    <router-link
      to="/profile"
      class="w-100 p-3 sideHover pointer text-dark text-decoration-none"
    >
      Profile
    </router-link>

    <router-link
      to="/profile"
      class="w-100 p-3 sideHover pointer text-dark text-decoration-none"
    >
      Settings
    </router-link>
  </div>

  <div v-else class="fs-1 px-5">
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
