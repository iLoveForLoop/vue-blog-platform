<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { db } from '@/firebase/config'
import { addLike } from '@/composables/addLike'
import { deleteLike } from '@/composables/deleteLike'
import {
  collection,
  onSnapshot,
  where,
  query,
  Timestamp,
} from 'firebase/firestore'

const props = defineProps({
  comment: {},
})

const { comment } = props

const store = useStore()

//fetching likes in a comment
const likesCount = ref(0)
let killLikes
let killMyLikes

//like id
const likeId = ref(null)

//like color tracker
const isClicked = ref(false)

onMounted(async () => {
  const likesRef = collection(db, 'likes')
  const queryLikes = query(likesRef, where('comment_id', '==', comment.id))
  const myLikes = query(
    likesRef,
    where('user_id', '==', store.state.user.uid),
    where('comment_id', '==', comment.id)
  )

  killLikes = onSnapshot(
    queryLikes,
    snapshot => {
      likesCount.value = snapshot.size
    },
    err => {
      console.log(err.message)
    }
  )

  killMyLikes = onSnapshot(myLikes, snapshot => {
    if (!snapshot.empty) {
      likeId.value = snapshot.docs[0].id
      isClicked.value = true
    } else {
      isClicked.value = false
    }
  })
})

onUnmounted(() => {
  killLikes()
  killMyLikes()
})

//toggle the heart
const heart = ref('bi bi-heart')

const toggleReact = async () => {
  console.log(isClicked.value)
  if (isClicked.value) {
    try {
      await deleteLike(likeId.value)
      isClicked.value = false
    } catch (error) {
      console.log(error.value)
    }
  } else {
    try {
      const data = {
        user_id: store.state.user.uid,
        comment_id: comment.id,
        created_at: Timestamp.now(),
      }

      await addLike(data)
      isClicked.value = true
    } catch (error) {
      console.log(error.message)
    }
  }
}

watch(isClicked, newVal => {
  if (newVal) {
    heart.value = 'bi bi-heart-fill text-danger'
  } else {
    heart.value = 'bi bi-heart'
  }
})
</script>

<template>
  <div
    class="bg-light d-flex flex-column justify-content-between align-items-center mt-1"
  >
    <div class="d-flex flex-column align-items-center">
      <i :class="heart" @click="toggleReact"></i>
      <p class="m-0 ts">{{ likesCount == 0 ? '' : likesCount }}</p>
    </div>

    <!-- <div class="d-flex flex-column align-items-center">
      <i class="bi bi-hand-thumbs-down"></i>
      <p class="m-0 ts">1</p>
    </div> -->
  </div>
</template>

<style scoped>
.ts {
  font-size: 0.8em;
}
</style>
