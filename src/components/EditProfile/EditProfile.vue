<script setup>
import EditPopUp from './EditPopUp.vue'
import {
  updateBio,
  updateDisplayName,
  updateProfilePic,
} from '@/composables/updateProfile'
import { computed, onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { cloudinaryConfig } from '@/cloudinary/cloudinaryConfig'
import { useStore } from 'vuex'

const props = defineProps({
  user: {},
})

const store = useStore()
const isComponentOverLapping = computed(() => store.state.isComponentOverLapping)
const myEditProfile = ref(null)
const newUserName = ref(props.user?.displayName)
const newBio = ref(props.user?.bio ? props.user?.bio : 'no bio yet')

const emit = defineEmits(['close-edit-profile'])
const isEditUsernameOpen = ref(false)

const isEditBioOpen = ref(false)
const closePopOver = () => {
  isEditUsernameOpen.value = false
  isEditBioOpen.value = false
}

const handleNewData = data => {
  if (data.type === 'bio') {
    newBio.value = data.text
  } else if (data.type === 'username') {
    newUserName.value = data.text
  }
}

const profile = ref(null)
const selectedFile = ref(null)
const formData = new FormData()
const url = ref(props.user.photoURL)
console.log('url value:', url.value)

const update = async () => {
  let newURL = null
  try {
    if (newUserName.value !== props.user.displayName) {
      await updateDisplayName(newUserName.value)
    }
    if (newBio.value !== props.user.bio) {
      await updateBio(newBio.value)
    }
    if (url.value !== props.user.photoURL) {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
        formData
      )
      newURL = res.data.secure_url
      url.value = newURL
      await updateProfilePic(newURL)
    }
    emit('close-edit-profile')
  } catch (error) {
    console.log(error.message)
  }
}

const toggleProfileChange = () => {
  profile.value.click()
}

const onProfileChange = async e => {
  const file = e.target.files[0]
  selectedFile.value = file
  url.value = URL.createObjectURL(file)

  formData.append('file', selectedFile.value)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset)
}

const closeOnEscape = (e) => {
  if (e.key == 'Escape') emit('close-edit-profile')
}

onMounted(() => {
  if (myEditProfile.value) {
    myEditProfile.value.focus()
    myEditProfile.value.addEventListener('keydown', closeOnEscape)
  }

})


watch(isComponentOverLapping, (newVal) => {
  if (newVal) {
    myEditProfile.value.removeEventListener('keydown', closeOnEscape)
  } else {
    setTimeout(() => {
      myEditProfile.value.addEventListener('keydown', closeOnEscape)
      myEditProfile.value.focus()
    }, 200)
  }

})

const openEdits = (type) => {
  switch (type) {
    case 'username':
      isEditUsernameOpen.value = true
      store.commit('setIsComponentOverLapping', true)
      break
    case 'bio':
      isEditBioOpen.value = true
      store.commit('setIsComponentOverLapping', true)
      break
  }
}
</script>

<template>
  <div class="back d-flex flex-column align-items-center justify-content-center poppins-regular"
    @click.self="emit('close-edit-profile')" ref="myEditProfile" tabindex="0">
    <!-- For Styling purposes only -->
    <div class="backdr" v-if="isEditUsernameOpen || isEditBioOpen"></div>
    <!-- For Styling purposes only -->
    <transition name="pop">
      <EditPopUp v-if="isEditUsernameOpen" type="username" :text="newUserName" @close-popover="closePopOver"
        @send-data="handleNewData" />
    </transition>
    <transition name="pop">
      <EditPopUp v-if="isEditBioOpen" type="bio" :text="newBio" @close-popover="closePopOver"
        @send-data="handleNewData" />
    </transition>

    <div class="bg-gray text-light text-center p-3 bg-gray border-b rounded-top-4" style="width: 40%; z-index: 2">
      <p class="m-0">Edit Profile</p>
    </div>
    <div class="rounded-bottom-4 bg-gray d-flex" style="height: 65vh; width: 40%">
      <form @submit.prevent="update" class="d-flex flex-column justify-content-between w-100 p-3 pb-4">
        <div class="text-light d-flex flex-column flex-grow-1 w-100 gap-4">
          <div class="d-flex flex justify-content-start align-items-start">
            <div class="d-flex flex-column flex-grow-1 w-100 gap-2" @click="openEdits('username')"
              style="cursor: pointer">
              <p class="m-0">Username</p>
              <div class="border-b w-100 pb-2">
                <p class="m-0 fw-lighter">{{ newUserName }}</p>
              </div>
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center">
              <input class="d-none" type="file" @change="onProfileChange" ref="profile" />
              <img class="circle" :src="url
                ? url
                : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
                " alt="user" @click="toggleProfileChange" />
            </div>
          </div>

          <div class="d-flex flex-column justify-content-start align-items-start gap-2" @click="openEdits('bio')"
            style="cursor: pointer">
            <p class="m-0">Bio</p>
            <div class="border-b w-100 pb-2">
              <p class="m-0 fw-lighter">
                {{ newBio }}
              </p>
            </div>
          </div>

          <div class="d-flex flex-column justify-content-start align-items-start gap-2">
            <p class="m-0">Email</p>
            <div class="border-b w-100 pb-2">
              <p class="m-0 fw-lighter">{{ props.user?.email }}</p>
            </div>
          </div>
        </div>

        <!-- <p class="text-info m-0 text-end">Share</p> -->
        <button type="submit" class="btn my-border rounded-pill mt-4 text-light w-100 btn-u">
          <a class="text-decoration-none">Save</a>
        </button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0) !important;
}

.back:focus {
  outline: none;
}

.bg-gray {
  background: rgb(52, 51, 51);
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  /* border-radius: 0 !important; */
}

.btn-u {
  transition: 0.2s ease-in-out;
}

.btn-u:hover {
  background-color: rgb(231, 231, 231);
  color: black !important;
}

.circle {
  border-radius: 50%;
  /* width: 200px;  */
  height: 60px;
  width: 60px;
  object-fit: cover;
  /* Ensures the image is cropped */
  object-position: center;
}

.backdr {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5) !important;
  top: 0;
  left: 0;
  z-index: 5;
}

.pop-enter-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.pop-leave-active {
  transition: none;
}

.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.pop-enter-to,
.pop-leave-from {
  transform: scale(1);
  opacity: 1;
}
</style>
