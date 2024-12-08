<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref(null)
const toggleLogin = ref(true)
const toggleSignup = ref(false)

const login = async () => {
  try {
    await store.dispatch('logIn', {
      email: email.value,
      password: password.value,
    })
    router.push('/home')
  } catch (err) {
    error.value = err.message
    setTimeout(() => {
      error.value = null
    }, 2000)
  }
}

const signUp = async () => {
  try {
    if (password.value != confirmPassword.value) {
      throw new Error("Password doesn't match")
    }
    await store.dispatch('signUp', {
      email: email.value,
      password: password.value,
    })
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    router.push('/home')
  } catch (err) {
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    error.value = err.message
    setTimeout(() => {
      error.value = null
    }, 2000)
  }
}

const switchToggle = () => {
  toggleSignup.value = !toggleSignup.value

  setTimeout(() => {
    toggleLogin.value = !toggleLogin.value
  }, 350)
}
</script>

<template>
  <div class="w-100 main-bg poppins-regular" style="height: 100vh">
    <transition name="slide">
      <div class="alert alert-danger errpos" role="alert" v-if="error">
        {{ error }}
      </div>
    </transition>

    <transition name="fade">
      <div
        class="container poppins-regular main-bg d-flex flex-column align-items-center justify-content-center gap-3"
        style="height: 100vh"
        v-if="toggleLogin"
      >
        <!--Log in-->
        <div class="b-size my-border">
          <form
            @submit.prevent="login"
            class="text-light d-flex flex-column gap-3 h-auto p-5"
            style="height: 60vh"
          >
            <div class="d-flex align-items-center justify-content-center">
              <h1 class="m-0 logo-font">Rants</h1>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                class="form-control i-style p-0 text-light"
                type="email"
                id="email"
                v-model="email"
                required
              />
            </div>

            <div class="mb-3">
              <label for="password" id="password" class="form-label"
                >Password</label
              >
              <input
                class="form-control i-style p-0 text-light"
                type="password"
                id="password"
                v-model="password"
                required
              />
            </div>

            <div class="d-flex justify-content-center">
              <button
                class="btn color-btn rounded form-control text-light"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
        </div>

        <div
          class="my-border b-size text-light d-flex justify-content-center align-items-center py-4 gap-1"
        >
          <p class="m-0">Do not have an account?</p>
          <a @click="switchToggle" class="blue">Sign up</a>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        class="container poppins-regular main-bg d-flex flex-column gap-3 align-items-center justify-content-center"
        style="height: 100vh"
        v-if="toggleSignup"
      >
        <!--Sign Up-->
        <div class="b-size my-border text-light">
          <form
            @submit.prevent="signUp"
            class="p-5 d-flex flex-column gap-3 justify-content-between h-auto"
            style="height: 60vh"
          >
            <div class="d-flex align-items-center justify-content-center">
              <h1 class="m-0 logo-font">Rants</h1>
            </div>

            <div class="mb-1">
              <label for="email" class="form-label">Email</label>
              <input
                class="form-control i-style text-light p-0"
                type="email"
                id="email"
                v-model="email"
                required
              />
            </div>

            <!-- <div class="mb-1">
              <label for="username" class="form-label">Username</label>
              <input
                class="form-control i-style text-light p-0"
                type="text"
                id="username"
                v-model="username"
                required
              />
            </div> -->

            <div class="mb-1">
              <label for="password" id="password" class="form-label"
                >Password</label
              >
              <input
                class="form-control i-style text-light p-0"
                type="password"
                id="password"
                v-model="password"
                required
              />
            </div>

            <div class="mb-1">
              <label for="password" id="password" class="form-label"
                >Confirm Password</label
              >
              <input
                class="form-control i-style text-light p-0"
                type="password"
                id="password"
                v-model="confirmPassword"
                required
              />
            </div>

            <div class="d-flex justify-content-center">
              <button
                class="btn color-btn rounded form-control text-light"
                type="submit"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div
          class="my-border b-size text-light d-flex justify-content-center align-items-center py-4 gap-1"
        >
          <p class="m-0">Already have an account?</p>
          <a @click="switchToggle" class="blue">Log in</a>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.blue {
  color: rgb(30, 75, 165) !important;
  cursor: pointer;
  text-decoration: none;
}

.color-btn {
  background-color: rgb(30, 75, 165);
}

input::placeholder {
  color: rgb(246, 246, 246);
  font-weight: 200;
}

.i-style {
  border: none;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  background: transparent !important;
}

input:focus {
  outline: none;
  box-shadow: none;
}

.border-bl {
  border-bottom-left-radius: 100%;
  border-right: solid 2px black;
}

.border-br {
  border-bottom-right-radius: 100%;
  border-left: solid 2px black;
}

.big-fs {
  font-size: 10em;
}

.errpos {
  position: fixed;
  right: 1em;
  top: 1em;
  transition: 0.3s ease-in-out;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.fade-enter {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  transition: opacity 0.5s ease;
  opacity: 0;
}

.slide-enter-active {
  opacity: 0;
  transform: translateX(-50%);
  transition: 0.5s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-enter {
  transform: translateX(-50%); /* Start position off-screen */
  opacity: 0; /* Optional: fade in along with the slide */
}
.slide-leave-to {
  opacity: 0; /* Optional: fade out along with the slide */
}

.b-size {
  width: 410px;
}

label {
  font-weight: 100;
}
</style>
