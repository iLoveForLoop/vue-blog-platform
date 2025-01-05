<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import {
  getRandomUsers,
} from '@/composables/getCollections'
import { ref, onMounted } from 'vue'
import ProfileAndEmail from '../ProfileAndEmail.vue'
import { getCurrentProfileInfo } from '@/composables/getProfileDetails'




const router = useRouter()
const store = useStore()

const isReady = computed(() => store.state.isAuthReady)


const { user } = getCurrentProfileInfo()
const randomUsers = ref(null)

const logout = async () => {
  store.commit('setIsNewUser', false)
  await store.dispatch('logout')

  router.push('/login')
}

onMounted(async () => {
  randomUsers.value = await getRandomUsers()

})


const isNewUser = computed(() => store.state.isNewUser)
const isOnProfile = computed(() => store.state.isOnProfile)


const links = (data) => {
  switch (data) {
    case 1:
      window.open('https://www.facebook.com/jeferson.bayking.2024', '_blank');
      break
    case 2:
      window.open('https://www.instagram.com/jeferson.bayking/', '_blank');
      break
    case 3:
      window.open('https://github.com/iLoveForLoop', '_blank');
      break
    case 4:
      window.open('https://www.linkedin.com/in/jeferson-bayking-883290324', '_blank');
      break
  }
}
</script>

<template>
  <template v-if="isReady && user && !isNewUser && !isOnProfile">
    <div class="main-bg d-flex flex-column gap-5 l-border poppins-regular px-5" style="width: 700px"
      v-if="store.state.user">
      <!--Search-->
      <!-- <form class="d-flex mt-3" style="height: 6vh" role="search">
        <div class="search-logo bg-dark text-light d-flex justify-content-center align-items-center ps-3 pe-0">
          <i class="bi bi-search opacity-50"></i>
        </div>
        <input class="form-control search-bar bg-dark border-0 text-light m-0" type="search" placeholder="Search"
          aria-label="Search" />
      </form> -->

      <!--Log out-->
      <div class="rounded-4 text-light mt-5">
        <div class="d-flex justify-content-between align-items-center px-3">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <img class="circle" :src="user?.photoURL
              ? user?.photoURL
              : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
              " alt="pic" />
            <div class="d-flex flex-column">
              <p class="m-0 name-size">
                {{ user?.displayName }}
              </p>
              <p class="m-0 name-size fw-lighter">
                {{ user?.email }}
              </p>
            </div>

          </div>

          <div>
            <a @click="logout" class="text-decoration-none text-danger name-size">Logout</a>
          </div>
        </div>
      </div>

      <!--Suggested Accounts-->
      <div class="rounded-4 text-light d-flex flex-column gap-4 my-border p-3">
        <p>Suggested for you</p>

        <div class="d-flex justify-content-between align-items-center" v-for="randomuser in randomUsers"
          :key="randomuser.id">
          <ProfileAndEmail textsize="0.8" :email="randomuser.displayName" :profilePic="randomuser?.photoURL
            ? randomuser?.photoURL
            : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
            " />

          <div>
            <a class="text-decoration-none name-size">Follow</a>
          </div>
        </div>
      </div>
      <div class="text-secondary d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <!-- <p class="text-center m-0 fw-light">Jeferson Bayking</p> -->
        <div class="d-flex gap-3">
          <i @click="links(1)" class="bi bi-facebook"></i>
          <i @click="links(2)" class="bi bi-instagram"></i>
          <i @click="links(3)" class="bi bi-github"></i>
          <i @click="links(4)" class="bi bi-linkedin"></i>
        </div>
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

.name-size {
  font-size: 0.8em;
}
</style>
