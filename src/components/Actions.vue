<script setup>
import { ref, watch, onMounted, onUnmounted, defineProps } from 'vue'
import { addLike } from '@/composables/addLike'
import { checkLike } from '@/composables/checkLike'
import { db } from '@/firebase/config'
import {
  onSnapshot,
  getDocs,
  query,
  where,
  collection,
  Timestamp,
} from 'firebase/firestore'
import { useStore } from 'vuex'

const store = useStore()

console.log('From actions: ', store.state.user.uid)

const props = defineProps({
  id: String,
  userId: String,
})
const { id, userId } = props

const likes = ref(0)
const alreadyLiked = ref(false)

onMounted(async () => {
  const likesRef = collection(db, 'likes')
  const postLikes = query(likesRef, where('post_id', '==', id))

  const kill = onSnapshot(postLikes, snapshot => {
    likes.value = snapshot.size
  })

  onUnmounted(() => {
    kill()
  })

  alreadyLiked.value = await checkLike(store.state.user.uid, id)
  console.log(alreadyLiked.value)
})

watch(alreadyLiked, like => {
  if (alreadyLiked.value != like) alreadyLiked.value = like
})

const heart = ref('bi bi-heart')
const heartBreak = ref('bi bi-heartbreak')
const comment = ref('bi bi-chat-left')
const heartClick = ref(false)
const heartBreakClick = ref(false)
const commentClick = ref(false)

const toggle = async data => {
  switch (data) {
    case 1:
      if (!heartClick.value) {
        try {
          const likeData = {
            post_id: id,
            user_id: userId,
            created_at: Timestamp.now(),
          }
          await addLike(likeData)
          // likes.value++
        } catch (err) {
          console.log(err.message)
        }

        heart.value = 'bi bi-heart-fill text-danger'
        heartBreak.value = 'bi bi-heartbreak'
        heartBreakClick.value = !heartClick.value
      } else {
        heart.value = 'bi bi-heart'
      }
      heartClick.value = !heartClick.value
      break
    case 2:
      if (!heartBreakClick.value) {
        heartBreak.value = 'bi bi-heartbreak-fill text-danger'
        heart.value = 'bi bi-heart'
        heartClick.value = !heartClick.value
      } else {
        heartBreak.value = 'bi bi-heartbreak'
      }
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
i {
  cursor: pointer;
}

.small-text {
  font-size: 15px;
}
</style>
