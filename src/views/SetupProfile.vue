<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { cloudinaryConfig } from '@/cloudinary/cloudinaryConfig'
import { db } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { updateProfilePic } from '@/composables/updateProfile'

const store = useStore()
const router = useRouter()

const bio = ref('')
const profile = ref(null)
const selectedFile = ref(null)
const url = ref(null)
const link = ref(null)
// const formData = new FormData()


const onProfileChange = async e => {
  const file = e.target.files[0]
  selectedFile.value = file
  url.value = URL.createObjectURL(file)

  // formData.append('file', selectedFile.value)
  // formData.append('upload_preset', cloudinaryConfig.uploadPreset)
}

const toggleProfileChange = () => {
  profile.value.click()
}

// const saveProfile = async () => {
//   try {
//     const res = await axios.post(
//       `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
//       formData
//     )
//     link.value = res.data.secure_url
//     console.log('upload pic success!')
//     const userRef = doc(db, 'users', store.state.user.uid)
//     await updateDoc(userRef, {
//       photoURL: link.value,
//       bio: bio.value,
//     })
//     console.log('profile update success!')
//     store.commit('setIsNewUser', false)
//     router.push('/home')
//   } catch (e) {
//     console.error(e.message)
//   }
// }

const skipProfileUpdate = () => {
  store.commit('setIsNewUser', false)
  window.location.reload()
  router.push('/home')
}

const uploadProfilePicture = async () => {

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset)

  try {

    const res = await axios.post('http://localhost:3000/upload',
      formData
      , {
        headers: { "Content-Type": "multipart/form-data" }
      })
    const { url } = res.data
    await updateProfilePic(url)
    store.commit('setIsNewUser', false)
    window.location.reload()
    router.push('/home')
  } catch (error) {
    console.log('Failed to upload in edit profile: ', error.message)
  }

}
</script>

<template>
  <div class="w-100 main-bg poppins-regular d-flex flex-column justify-content-start align-items-center gap-4"
    style="height: 100vh">
    <div class="w-50 my-border d-flex flex-column justify-content-between align-items-center p-5" style="height: 100vh">
      <div class="w-100 text-start">
        <h2 class="text-light">Setup profile</h2>
      </div>

      <div class="d-flex flex-column w-100 p-3 tsize">
        <p class="text-light">Add profile picture:</p>
        <img class="circle m-auto" :src="url
          ? url
          : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
          " alt="profile  pic" />
        <input class="d-none" type="file" @change="onProfileChange" ref="profile" />
        <div class="w-100 text-center">
          <button class="btn my-border rounded-pill mt-4 text-light w-100 btn-u" @click="toggleProfileChange">
            Upload
          </button>
        </div>
      </div>
      <div class="d-flex flex-column w-100 p-3 tsize">
        <p class="text-light">Add a short bio:</p>
        <textarea class="w-100 m-auto rounded ta-bg" name="" id="" v-model="bio"></textarea>
      </div>
      <div class="w-100 justify-content-center align-items-center d-flex flex-column gap-3">
        <button class="btn my-border text-light rounded-pill w-100 btn-s" @click="uploadProfilePicture">
          Save
        </button>
        <button class="btn my-border text-light rounded-pill w-100 btn-sk" @click="skipProfileUpdate">
          Skip
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.circle {
  border-radius: 50%;
  /* width: 200px;  */
  height: 180px;
  width: 180px;
  object-fit: cover;
  /* Ensures the image is cropped */
  object-position: center;
}

.tsize {
  font-size: 1.1em;
}

.btn-u {
  transition: 0.2s ease-in-out;
}

.btn-u:hover {
  background-color: rgb(231, 231, 231);
  color: black !important;
}

.btn-s {
  transition: 0.2s ease-in-out;
}

.btn-s:hover {
  background-color: rgb(42, 198, 128);
  color: black !important;
}

.btn-sk {
  transition: 0.2s ease-in-out;
}

.btn-sk:hover {
  background-color: rgb(33, 94, 169);
  /* color: black !important; */
}

.ta-bg {
  background-color: rgb(222, 222, 222);
}
</style>
