<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
import {
  getCurrentUserInfo,
  getSnapCollectionWithUser,
  getSnapPostWithUser,
} from '@/composables/getCollections'
import Post from '@/components/Post.vue'
import { cloudinaryConfig } from '@/cloudinary/cloudinaryConfig'
import { db } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import axios from 'axios'
import EditProfile from '@/components/EditProfile/EditProfile.vue'

const store = useStore()
const user = ref(null)
const currentUser = ref(null)

const isReady = computed(() => store.state.isAuthReady)
const { posts } = getSnapPostWithUser()

const loadUserData = async () => {
  if (store.state.user?.uid) {
    const { user: fetchedUser } = await getCurrentUserInfo(store.state.user.uid)
    user.value = fetchedUser
  }
}

onMounted(async () => {
  await loadUserData()
})

watch(isReady, ready => {
  if (ready && store.state.user) {
    loadUserData()
  }
})

const profile = ref(null)
const selectedFile = ref(null)
const url = ref(user.photoURL)

const toggleProfileChange = () => {
  profile.value.click()
}

const onProfileChange = async e => {
  const file = e.target.files[0]
  selectedFile.value = file
  url.value = URL.createObjectURL(file)

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('upload_preset', cloudinaryConfig.uploadPreset)

  let newUrl = null

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      formData
    )
    newUrl = res.data.secure_url
    const userRef = doc(db, 'users', store.state.user.uid)
    await updateDoc(userRef, {
      photoURL: newUrl,
    })

    console.log('upload pic success!')
    url.value = newUrl
  } catch (e) {
    console.error(e.message)
  }
}

// URL.revokeObjectURL(imageURL);
</script>

<template>
  <EditProfile />
  <div v-if="isReady" class="w-100 poppins-regular" style="height: 100vh">
    <div v-if="store.state.user">
      <div
        class="container d-flex flex-column main-bg overflow-scroll hidebar my-border mt-5 p-5 rounded-5"
        style="height: 100vh; width: 60%"
        v-if="user"
      >
        <div
          class="text-center text-center d-flex justify-content-between align-items-stretch py-3 rounded border-bt"
        >
          <input
            class="d-none"
            type="file"
            @change="onProfileChange"
            ref="profile"
          />

          <div
            class="text-light d-flex flex-column justify-content-between align-items-start"
          >
            <div class="d-flex flex-column align-items-start">
              <p class="fs-5 m-0 fw-bold fs-3">{{ user.value?.displayName }}</p>
              <p class="mb-0 fw-light" style="font-size: 0.9em">
                {{ user.value?.email }}
              </p>
            </div>
            <div>
              <p class="m-0">
                {{ user.value?.bio ? user.value?.bio : 'No bio yet' }}
              </p>
            </div>
          </div>

          <div
            class="text-light d-flex flex-column justify-content-center align-items-center gap-4"
          >
            <img
              class="circle"
              :src="
                user.value?.photoURL
                  ? user.value?.photoURL
                  : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
              "
              alt="user"
              @click="toggleProfileChange"
            />
            <button class="btn my-border text-light rounded-4 px-5 box">
              Edit Profile
            </button>
          </div>
        </div>

        <div v-if="posts.length > 0">
          <div v-for="post in posts" :key="post.id">
            <Post :post="post" :isFromProfile="true" />
          </div>
        </div>
        <div v-else>
          <p>No post yet</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hidebar {
  scrollbar-width: none;
}

.p-size {
  font-size: 10em;
}

.p-b {
  padding-bottom: 5.5em;
}

.circle {
  border-radius: 50%;
  /* width: 200px;  */
  height: 150px;
  width: 150px;
  object-fit: cover; /* Ensures the image is cropped */
  object-position: center;
}

.border-bt {
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
}

.box {
  transition: 0.2s ease-in-out;
}

.box:hover {
  background-color: rgb(202, 202, 202);
  color: black !important;
}
</style>
