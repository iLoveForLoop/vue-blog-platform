<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
import {
  getCurrentUserInfo,
  getSnapCollectionWithUser,
} from '@/composables/getCollections'
import Post from '@/components/Post.vue'

import { uploadPicture } from '@/composables/uploadPicture'
import { cloudinaryConfig } from '@/cloudinary/cloudinaryConfig'
import { db } from '@/firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import axios from 'axios'

const store = useStore()
const user = ref(null)
const currentUser = ref(null)

const isReady = computed(() => store.state.isAuthReady)
const { posts } = getSnapCollectionWithUser()

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

  if (posts) {
    currentUser.value = posts.find(obj => obj.user == store.state.user.uid)
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
import TestPopover from '@/components/TestPopover.vue'
</script>

<template>
  <TestPopover/>
  <div v-if="isReady" class="w-100 poppins-regular" style="height: 100vh">
    <div v-if="store.state.user">
      <div
        class="container d-flex flex-column bg-dark w-100 overflow-scroll hidebar"
        style="height: 100vh"
        v-if="user"
      >
        <div class="text-center text-center mt-3">
          <img
            class="circle"
            :src="
              user.value.photoURL
                ? user.value.photoURL
                : 'https://placehold.co/200'
            "
            alt="user"
            @click="toggleProfileChange"
          />
          <input
            class="d-none"
            type="file"
            @change="onProfileChange"
            ref="profile"
          />

          <div class="text-light">
            <h2>{{ user.value.displayName }}</h2>
            <p>{{ user.value.email }}</p>
          </div>
        </div>

        <div class="text-center overflow-scroll hidebar" style="height: 100vh">
          <div v-for="post in posts" :key="post.id">
            <Post
              :post="post"
              v-if="post.user_id == user.value.id"
              :isFromProfile="true"
            />
            <!-- <EditPost :post="post" v-if="store.state.toggleEdit" /> -->
          </div>
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
  width: 200px; /* Desired width */
  height: 200px; /* Desired height */
  object-fit: cover; /* Ensures the image is cropped */
  object-position: center;
}
</style>
