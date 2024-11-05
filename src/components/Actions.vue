<script setup>
import { ref, watch, onMounted, onUnmounted, defineProps } from 'vue'
import { addLike } from '@/composables/addLike'

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

const store = useStore()

console.log('From actions: ', store.state.user.uid)

const props = defineProps({
  post: [{}],
  id: String,
  userId: String,
})
const { post } = props

const likes = ref(0)
const like_id = ref(null)
const alreadyLiked = ref(false)

const heart = ref('bi bi-heart')
const heartBreak = ref('bi bi-heartbreak')
const comment = ref('bi bi-chat-left')
const heartClick = ref(false)
const heartBreakClick = ref(false)
const commentClick = ref(false)

onMounted(async () => {
  const likesRef = collection(db, 'likes')
  const postLikes = query(likesRef, where('post_id', '==', post.id))
  const userLikes = query(
    likesRef,
    where('user_id', '==', store.state.user.uid),
    where('post_id', '==', post.id)
  )

  const killPostLikes = onSnapshot(postLikes, snapshot => {
    likes.value = snapshot.size
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
  })
})

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
      // Handle heartBreak click if needed
      break

    case 3:
      commentClick.value = !commentClick.value
      if (commentClick.value) {
        comment.value = 'bi bi-chat-left-fill text-dark'
      } else {
        comment.value = 'bi bi-chat-left'
      }
      heartBreakClick.value = !heartBreakClick.value
      break
  }
}
</script>

<template>
  <div class="d-flex flex-column gap-1">
    <div class="d-flex align-items-center gap-4 fs-5">
      <i :class="heart" @click="toggle(1)"></i>
      <!-- <i :class="heartBreak" @click="toggle(2)"></i> -->
      <i :class="comment" @mouseenter="toggle(3)" @mouseleave="toggle(3)"></i>
    </div>
    <div class="d-flex gap-2 fw-light">
      <p class="small-text">{{ likes }} {{ likes > 1 ? 'likes' : 'like' }}</p>
      <p class="small-text">0 replies</p>
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
</style>
