<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const isReady = computed(() => store.state.isAuthReady)

const logout = async () => {
  await store.dispatch('logout')
  router.push('/login')
}
</script>

<template>
  <template v-if="isReady">
    <div
      class="main-bg d-flex flex-column w-50 gap-5 l-border poppins-regular px-5"
      v-if="store.state.user"
    >
      <!--Search-->
      <form class="d-flex mt-3" style="height: 6vh" role="search">
        <div
          class="search-logo bg-dark text-light d-flex justify-content-center align-items-center ps-3 pe-0"
        >
          <i class="bi bi-search opacity-50"></i>
        </div>
        <input
          class="form-control search-bar bg-dark border-0 text-light m-0"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </form>

      <!--Log out-->
      <div class="rounded-4 text-light">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <i class="bi bi-person-circle fs-1"></i>
            <p v-if="store.state.user.email" class="m-0 name-size">
              {{ store.state.user.email }}
            </p>
          </div>

          <div>
            <a @click="logout" class="text-decoration-none text-danger"
              >Logout</a
            >
          </div>
        </div>
      </div>

      <!--Suggested Accounts-->
      <div class="rounded-4 text-light d-flex flex-column gap-2 my-border p-3">
        <p>Suggested for you</p>

        <div
          class="d-flex justify-content-between align-items-center"
          v-for="n in 5"
          :key="n"
        >
          <div class="d-flex justify-content-start align-items-center gap-2">
            <i class="bi bi-person-circle fs-1"></i>
            <p v-if="store.state.user.email" class="m-0 name-size">
              {{ store.state.user.email }}
            </p>
          </div>

          <div>
            <a @click="logout" class="text-decoration-none">Follow</a>
          </div>
        </div>
      </div>
      <div>
        <p class="text-center">&copy;Jeferson Bayking</p>
      </div>
    </div>
  </template>
</template>

<style scoped>
.search-bar {
  border-radius: 0;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
}

.search-logo {
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
}

input[type='search']:focus {
  outline: none;
  box-shadow: none;
  border-color: #ffffff;
}

input::placeholder {
  color: rgb(255, 255, 255);
  opacity: 0.5;
}

.l-border {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.bg-gray {
  background-color: #292929;
}

input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

a {
  cursor: pointer;
}

.sm-font {
  font-size: 0.9em;
}
</style>
