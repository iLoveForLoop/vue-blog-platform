<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const email = ref('')
const password = ref('')
const error = ref(null)

const login = async () => {
  try {
    await store.dispatch('logIn', {
      email: email.value,
      password: password.value,
    })
    router.push('/')
  } catch (err) {
    error.value = err.message
    setTimeout(() => {
      error.value = null
    }, 2000)
  }
}

const signUp = async () => {
  try {
    await store.dispatch('signUp', {
      email: email.value,
      password: password.value,
    })
    router.push('/')
  } catch (err) {
    error.value = err.message
    setTimeout(() => {
      error.value = null
    }, 2000)
  }
}
</script>

<template>
  <div
    class="container d-flex justify-content-center align-items-center poppins-regular"
    style="height: 100vh"
  >
    <div style="width: 40%">
      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>

      <form @submit.prevent="signUp" class="p-5 blue">
        <div
          class="d-flex align-items-center justify-content-center gap-2 mb-3"
        >
          <h2 class="m-0">Sign Up</h2>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            class="form-control"
            type="email"
            id="email"
            placeholder="Enter you email"
            v-model="email"
          />
        </div>

        <div class="mb-3">
          <label for="password" id="password" class="form-label"
            >Password</label
          >
          <input
            class="form-control"
            type="password"
            placeholder="Enter you password"
            id="password"
            v-model="password"
          />
        </div>

        <div class="mb-3 d-flex justify-content-center green">
          <button class="btn w-100" type="submit">Sign Up</button>
        </div>
      </form>
    </div>

    <div style="width: 40%">
      <div class="alert alert-danger" role="alert" v-if="error">
        {{ error }}
      </div>
      <form @submit.prevent="login" class="p-5 blue">
        <div
          class="d-flex align-items-center justify-content-center gap-2 mb-3"
        >
          <h2 class="m-0">Log in</h2>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            class="form-control"
            type="email"
            id="email"
            placeholder="Enter you email"
            v-model="email"
          />
        </div>

        <div class="mb-3">
          <label for="password" id="password" class="form-label"
            >Password</label
          >
          <input
            class="form-control"
            type="password"
            placeholder="Enter you password"
            id="password"
            v-model="password"
          />
        </div>

        <div class="mb-3 d-flex justify-content-center green">
          <button class="btn w-100" type="submit">Log in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.green {
  background: rgb(108, 147, 108);
}

.blue {
  background: rgb(100, 100, 135);
}
</style>
