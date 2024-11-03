<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getPostLikes } from '@/composables/getCollections'
import { addLike } from '@/composables/addLike'
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/firebase' // Adjust the import path as needed

const props = defineProps({
  id: String,
  userId: String,
})
const { id, userId } = props

const likes = ref(0)
const heart = ref('bi bi-heart')
const heartClick = ref(false)

// Set up real-time listener on Firestore likes collection
onMounted(() => {
  const likesRef = collection(db, 'likes')
  const postlikes = query(likesRef, where('post_id', '==', id))

  const unsubscribe = onSnapshot(postlikes, snapshot => {
    likes.value = snapshot.size // Automatically updates like count in real-time
  })

  // Clean up listener on unmount
  onUnmounted(() => {
    unsubscribe()
  })
})

// Toggle like
const toggleLike = async () => {
  if (!heartClick.value) {
    try {
      const likeData = {
        post_id: id,
        user_id: userId,
        created_at: Timestamp.now(),
      }
      await addLike(likeData)
      heart.value = 'bi bi-heart-fill text-danger'
    } catch (err) {
      console.log(err.message)
    }
  } else {
    heart.value = 'bi bi-heart'
  }
  heartClick.value = !heartClick.value
}
</script>

<template>
  <div>
    <p>Likes: {{ likes }}</p>
    <i :class="heart" @click="toggleLike"></i>
  </div>
</template>
