<script setup>
import { ref, watch, onMounted, onUnmounted, defineProps, computed } from 'vue'
import { addLike } from '@/composables/addLike'
import { getCurrentProfileInfo } from '@/composables/getProfileDetails'

import { db } from '@/firebase/config'

import { deleteLike } from '@/composables/deleteLike'
import {
  onSnapshot,
  query,
  where,
  collection,
  Timestamp,
} from 'firebase/firestore'
import { useStore } from 'vuex'


import ViewPost from './ViewPost.vue'



const store = useStore()

// console.log('From actions: ', store.state.user.uid)

const props = defineProps({
  post: [{}],
  id: String,
  userId: String,
  isFromView: {
    type: Boolean,
    default: false,
  },
})
const { post, isFromView } = props

const likes = ref(0)
const comments = ref(0)
const like_id = ref(null)
const alreadyLiked = ref(false)

const heart = ref('bi bi-heart')
const comment = ref('bi bi-chat-left')

const heartBreakClick = ref(false)
const commentClick = ref(false)

const isViewingPost = ref(false)
const currentlyViewing = ref(false)

const { user } = getCurrentProfileInfo()


// const closeOnEscape = (e) => {
//   console.log('tried to close')
//   if (isViewingPost && e.key == 'Escape') {
//     closePost()
//   }
// }

onMounted(async () => {
  // document.addEventListener('keydown', closeOnEscape)
  const likesRef = collection(db, 'likes')
  const commentsRef = collection(db, 'comments')
  const postComments = query(commentsRef, where('post_id', '==', post.id))
  const postLikes = query(likesRef, where('post_id', '==', post.id))
  const userLikes = query(
    likesRef,
    where('user_id', '==', store.state.user.uid),
    where('post_id', '==', post.id)
  )

  const killPostLikes = onSnapshot(postLikes, snapshot => {
    likes.value = snapshot.size
  })

  const killPostComments = onSnapshot(postComments, snapshot => {
    comments.value = snapshot.size
  })

  const killUserLikes = onSnapshot(userLikes, snapshot => {
    if (!snapshot.empty) {
      like_id.value = snapshot.docs[0].id
      alreadyLiked.value = true
    } else {
      like_id.value = null
      alreadyLiked.value = false
    }
  })



  onUnmounted(() => {
    killPostLikes()
    killUserLikes()
    killPostComments()

  })
})

// onUnmounted(() => document.removeEventListener('keydown', closeOnEscape))


watch(alreadyLiked, newVal => {
  if (newVal) {
    heart.value = 'bi bi-heart-fill text-danger'
  } else {
    heart.value = 'bi bi-heart'
  }
})

const toggle = async data => {
  switch (data) {
    case 1:
      if (!alreadyLiked.value) {
        try {
          const likeData = {
            post_id: post.id,
            user_id: store.state.user.uid,
            created_at: Timestamp.now(),
            to_user_id: post.user.id,
            user: user.value,

          }
          await addLike(likeData)
          alreadyLiked.value = true
        } catch (err) {
          console.log(err.message)
        }
      } else {
        console.log('from if case 1: ', like_id.value)
        if (like_id.value) {
          try {
            await deleteLike(like_id.value)
            alreadyLiked.value = false
          } catch (err) {
            console.log(err.message)
          }
        }
      }
      break

    case 2:
      break

    case 3:

      commentClick.value = !commentClick.value
      if (commentClick.value) {
        comment.value = 'bi bi-chat-left-fill text-light'
      } else {
        comment.value = 'bi bi-chat-left'
      }
      heartBreakClick.value = !heartBreakClick.value
      break
  }
}

const viewPost = () => {
  if (isFromView) {
    if (!currentlyViewing) {
      isViewingPost.value = true
      currentlyViewing.value = true
    } else {
      console.log('already viewing')
    }
  } else {
    isViewingPost.value = true
  }
}

const closePost = () => {
  isViewingPost.value = false
  currentlyViewing.value = false
}
</script>

<template>
  <!-- For Styling purposes only -->
  <div class="backdrop" v-if="isViewingPost"></div>
  <!-- For Styling purposes only -->

  <transition name="pop">
    <ViewPost v-if="isViewingPost" :id="post.id" @closePost="closePost" @isViewed="isViewed = true" />
  </transition>

  <div class="d-flex flex-column gap-1">
    <div class="d-flex align-items-center gap-4 fs-5">
      <i :class="heart" @click="toggle(1)"></i>
      <!-- <i :class="heartBreak" @click="toggle(2)"></i> -->
      <i :class="comment" @mouseenter="toggle(3)" @mouseleave="toggle(3)" @click="viewPost"></i>
    </div>
    <div class="d-flex gap-2 fw-light">
      <p class="small-text">{{ likes }} {{ likes > 1 ? 'likes' : 'like' }}</p>
      <p class="small-text">
        {{ comments }} {{ comments > 1 ? 'replies' : 'reply' }}
      </p>
    </div>
  </div>
</template>


<style scoped>
.c {
  cursor: pointer;
}

.small-text {
  font-size: 15px;
}

.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(36, 35, 35, 0.5) !important;
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
