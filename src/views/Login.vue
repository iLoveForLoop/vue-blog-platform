<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const email = ref('')
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
  <div class="w-100 bg-dark poppins-regular" style="height: 100vh">
    <transition name="slide">
      <div class="alert alert-danger errpos" role="alert" v-if="error">
        {{ error }}
      </div>
    </transition>

    <!--Log in-->

    <transition name="fade">
      <div
        class="container poppins-regular bg-dark d-flex align-items-center justify-content-center"
        style="height: 100vh"
        v-if="toggleLogin"
      >
        <div class="row bg-dark w-100 p-3">
          <div class="col-7 bg-dark">
            <div class="row h-100">
              <div
                class="col-6 d-flex flex-column justify-content-center align-items-center text-light"
              >
                <i class="bi bi-bootstrap-fill big-fs"></i>
                <div class="text center">No account yet?</div>
                <div class="w-75 d-flex justify-content-center mt-2">
                  <button
                    class="btn btn-light py-3 rounded-pill w-75"
                    type="submit"
                    @click="switchToggle"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div
                class="col-6 p-0 bg-light border-bl d-flex flex-column align-items-center"
              >
                <div class="mt-5">
                  <div class="fs-2 text center">Welcome back</div>
                  <div class="fs-2 text-center">to the rants</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-5 bg-warning p-0">
            <form
              @submit.prevent="login"
              class="p-5 bg-light d-flex flex-column gap-3 justify-content-between"
              style="height: 60vh"
            >
              <div class="d-flex align-items-center justify-content-center">
                <h2 class="m-0">Log in</h2>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  class="form-control i-style p-0"
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
                  class="form-control i-style p-0"
                  type="password"
                  id="password"
                  v-model="password"
                  required
                />
              </div>

              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-dark w-50 py-3 rounded-pill"
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>

    <!--Sign Up-->
    <transition name="fade">
      <div
        class="container poppins-regular bg-dark d-flex align-items-center justify-content-center"
        style="height: 100vh"
        v-if="toggleSignup"
      >
        <div class="row bg-dark w-100 p-3">
          <div class="col-5 bg-warning p-0">
            <form
              @submit.prevent="signUp"
              class="p-5 bg-light d-flex flex-column gap-3 justify-content-between"
              style="height: 60vh"
            >
              <div class="d-flex align-items-center justify-content-center">
                <h2 class="m-0">Sign Up</h2>
              </div>

              <div class="mb-1">
                <label for="email" class="form-label">Email</label>
                <input
                  class="form-control i-style p-0"
                  type="email"
                  id="email"
                  v-model="email"
                  required
                />
              </div>

              <div class="mb-1">
                <label for="password" id="password" class="form-label"
                  >Password</label
                >
                <input
                  class="form-control i-style p-0"
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
                  class="form-control i-style p-0"
                  type="password"
                  id="password"
                  v-model="confirmPassword"
                  required
                />
              </div>

              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-dark w-50 py-3 rounded-pill"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div class="col-7 bg-dark">
            <div class="row h-100">
              <div
                class="col-6 p-0 bg-light d-flex flex-column align-items-center border-br"
              >
                <div
                  class="mt-5 d-flex flex-column justify-content-center align-items-center"
                >
                  <!-- <div class="fs-2 text center">Yow</div> -->
                  <div class="fs-2 text-center">Welcome to</div>
                  <div class="fs-2 text-center">the Rants</div>
                </div>
              </div>
              <div
                class="col-6 d-flex flex-column justify-content-center align-items-center text-light"
              >
                <i class="bi bi-bootstrap-fill big-fs"></i>
                <div class="text center">Already have an account?</div>
                <div class="w-75 d-flex justify-content-center mt-2">
                  <button
                    class="btn btn-light py-3 rounded-pill w-75"
                    type="submit"
                    @click="switchToggle"
                  >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.i-style {
  border: none;
  border-bottom: 3px solid black;
  border-radius: 0;
  background: transparent;
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
</style>
