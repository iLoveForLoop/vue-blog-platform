<script setup>
import Actions from './Actions.vue'

import { ref, computed, watch } from 'vue'
import EditPost from './EditPost.vue'
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  formatDistanceToNow,
} from 'date-fns'
import Popover from './Popover.vue'

const isEdit = ref(false)

const props = defineProps({
  post: [{}],
  isFromProfile: { type: Boolean, default: false },
  isFromSinglePost: { type: Boolean, default: false },
  isFromView: {
    type: Boolean,
    default: false,
  },
  currentUserProfilePic: String,
  currentUsername: String,
})

const profilePic = ref(
  props.post?.user.photoURL
    ? props.post?.user.photoURL
    : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
)
const showPopover = ref(false)

const togglePopover = () => {
  showPopover.value = !showPopover.value
}

const closePopover = () => {
  showPopover.value = false
}

const closeEditPost = () => {
  isEdit.value = false
}

const openEdit = data => {
  isEdit.value = data
  showPopover.value = false
}

// trimming post content
const postContent = ref(null)

watch(
  () => props.post,
  newPost => {
    postContent.value = newPost?.content || ''
  },
  { immediate: true }
)

const isExpanded = ref(false)
const canBeToggle = computed(() => postContent.value.length > 400)

const isNeedsToBeTrimmed = computed(
  () => canBeToggle.value && !isExpanded.value
)

const trimmedText = computed(() =>
  isNeedsToBeTrimmed.value ? postContent.value.slice(0, 415) : postContent.value
)

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

//converting Date to time ago

const postDate = computed(() => props.post.created_at.toDate())

const timeAgo = computed(() => {
  const now = new Date()
  const seconds = differenceInSeconds(now, postDate.value)

  if (seconds < 60) {
    return `${seconds}s`
  }

  const minutes = differenceInMinutes(now, postDate.value)
  if (minutes < 60) {
    return `${minutes}m`
  }

  const hours = differenceInHours(now, postDate.value)
  if (hours < 24) {
    return `${hours}h`
  }

  const days = differenceInDays(now, postDate.value)
  return `${days}d`
})
</script>


<template>
  <div
    class="poppins-regular d-flex flex-column align-items-center justify-content-center text-light py-3 pb-0 main-bg">
    <div class="w-100 d-flex flex-column justify-content-start p-3 rounded main-bg my-border" style="height: auto">
      <div class="d-flex justify-content-between">
        <div class="p-2 px-3 d-flex align-items-center justify-content-between gap-2 content-based">
          <img class="circle" :src="isFromProfile
            ? currentUserProfilePic
            : post?.user.photoURL
              ? post?.user.photoURL
              : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
            " alt="profile pic" />
          <p v-if="post && post.user" class="p-0 m-0 name-size">
            {{
              isFromProfile
                ? currentUsername
                : post?.user.displayName
                  ? post?.user.displayName
                  : 'not set'
            }}
            · <span class="fw-lighter">{{ timeAgo }}</span>
          </p>
        </div>
        <!--3 dots-->
        <div class="p-2 px-3 d-flex align-items-center justify-content-between position-relative">
          <!-- For Styling purposes only -->
          <div class="backdrop" v-if="showPopover || isEdit" @click.self="closePopover"></div>
          <!-- For Styling purposes only -->

          <transition name="pop">
            <EditPost v-if="isEdit" :post="post" @closeEditPost="closeEditPost" />
          </transition>

          <transition name="pop">
            <Popover v-if="showPopover" :id="post.id" from="post" :fromProfile="isFromProfile" @openEdit="openEdit"
              @closePopover="closePopover" />
          </transition>

          <i class="bi bi-three-dots" @click="togglePopover"></i>
        </div>
      </div>

      <!-- <div
        class="p-2 px-3 d-flex align-items-center justify-content-between content-based"
      >
        <p v-if="post && post.created_at" class="p-0 m-0 name-size">

          {{ timeAgo }}
        </p>
      </div> -->

      <hr />
      <div class="py-3 px-3 d-flex align-items-center justify-content-start">
        <!--CONTENT-->
        <!-- <div v-if="isFromSinglePost"> -->
        <!-- <p v-if="post && post.content" class="p-0 m-0">
            {{ post.content }}
          </p> -->
        <!-- </div> -->
        <!-- <div v-else> -->
        <p @click="toggleExpand" v-if="post && post.content" class="p-0 m-0" style="cursor: default">
          {{ trimmedText }}
          <span v-if="canBeToggle" class="text-secondary" style="cursor: pointer !important">{{ isExpanded ? '' :
            '...See more' }}</span>
        </p>
        <!-- </div> -->
      </div>
      <hr />
      <div v-if="post && post.user" class="px-3 d-flex justify-content-left align-items-center">
        <Actions :post="post" :isFromView="isFromView" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.inline-d {
  display: inline-block;
}

.content-based {
  width: fit-content;
  height: fit-content;
}

.name-size {
  font-size: 0.9em;
}

.date-size {
  font-size: 0.7em;
}

.line {
  width: 2px;
  height: 1vh;
  margin-left: 10%;
}

.par {
  position: relative;
}

.pos {
  top: -180%;
  right: -175%;
}

.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
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
