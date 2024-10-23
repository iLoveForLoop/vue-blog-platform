<script setup>
import Sidebar from './Sidebar.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const isReady = computed(() => store.state.isAuthReady)
const userEmail = computed(() => store.state.user?.email || 'Guest')
</script>

<template>
  <template v-if="isReady">
    <div v-if="store.state.user">
      <div
        class="bg-body-secondary poppins-regular d-flex justify-content-between"
        style="height: 9vh"
      >
        <div class="d-flex justify-content-start gap-3">
          <Sidebar />
          <a
            class="fs-3 text-dark p-2 text-decoration-none d-flex align-items-center gap-2"
            href="#"
          >
            <i class="bi bi-bootstrap-fill"></i>
            Rants
          </a>
        </div>

        <div class="d-flex align-items-center">
          <h6>{{ store.state.user?.uid || 'guest' }} -</h6>
          <h6>{{ store.state.user?.email || 'guest' }}</h6>
        </div>

        <div
          class="col-3 d-flex justify-content-end align-items-center me-5 my-2"
        >
          <div class="container">
            <form class="d-flex" role="search">
              <input
                class="form-control me-2 rounded-pill border border-2 border-dark custom-input"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="border-0 bg-transparent fs-5" type="submit">
                <i class="bi bi-search"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style scoped>
.small-text {
  font-size: 1.5em;
}

.pad {
  padding: 0 5em;
}

.custom-input:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: #f9fdf9;
  outline: none;
}
</style>
