<script setup>
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
import { getSnapPostWithUser } from '@/composables/getCollections'
import Post from '@/components/Post.vue'
import EditProfile from '@/components/EditProfile/EditProfile.vue'
import { getCurrentProfileInfo } from '@/composables/getProfileDetails'

const { user } = getCurrentProfileInfo()
const { posts } = getSnapPostWithUser()

const store = useStore()
const isEditingProfile = ref(false)
const isReady = computed(() => store.state.isAuthReady)
</script>

<template>
  <!-- For Styling purposes only -->
  <div class="backdr" v-if="isEditingProfile"></div>
  <!-- For Styling purposes only -->
  <transition name="pop">
    <EditProfile
      v-if="isEditingProfile"
      @close-edit-profile="isEditingProfile = false"
      :user="user"
    />
  </transition>

  <div v-if="isReady" class="w-100 poppins-regular" style="height: 100vh">
    <div v-if="store.state.user">
      <div
        class="container d-flex flex-column main-bg overflow-scroll hidebar my-border mt-5 p-5 rounded-5"
        style="height: 100vh; width: 60%"
      >
        <div
          class="text-center text-center d-flex justify-content-between align-items-stretch py-3 rounded border-bt"
        >
          <div
            class="text-light d-flex flex-column justify-content-between align-items-start"
          >
            <div class="d-flex flex-column align-items-start">
              <p class="fs-5 m-0 fw-bold fs-3">{{ user?.displayName }}</p>
              <p class="mb-0 fw-light" style="font-size: 0.9em">
                {{ user?.email }}
              </p>
            </div>
            <div>
              <p class="m-0">
                {{ user?.bio ? user?.bio : 'No bio yet' }}
              </p>
            </div>
          </div>

          <div
            class="text-light d-flex flex-column justify-content-center align-items-center gap-4"
          >
            <img
              class="circle"
              :src="
                user?.photoURL
                  ? user?.photoURL
                  : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
              "
              alt="user"
            />
            <button
              class="btn my-border text-light rounded-4 px-5 box"
              @click="isEditingProfile = true"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div v-if="posts.length > 0">
          <div v-for="post in posts" :key="post.id">
            <Post
              :post="post"
              :isFromProfile="true"
              :currentUserProfilePic="user?.photoURL"
            />
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
