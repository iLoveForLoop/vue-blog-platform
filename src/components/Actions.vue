<script setup>
import { ref, defineProps, watch, onMounted } from 'vue'
import { getPostLikes } from '@/composables/getCollections'

const props = defineProps({
  id: String,
})
const { id } = props

const likes = ref(0)

onMounted(async () => {
  likes.value = await getPostLikes(id)
  console.log(likes)
})

const heart = ref('bi bi-heart')
const heartBreak = ref('bi bi-heartbreak')
const comment = ref('bi bi-chat-left')
const heartClick = ref(false)
const heartBreakClick = ref(false)
const commentClick = ref(false)

const toggle = data => {
  switch (data) {
    case 1:
      heartClick.value = !heartClick.value
      console.log('toggle heart', heartClick.value)
      if (heartClick.value) {
        heart.value = 'bi bi-heart-fill text-danger'
        heartBreak.value = 'bi bi-heartbreak'
        heartBreakClick.value = !heartClick.value
      } else {
        heart.value = 'bi bi-heart'
      }
      console.log('toggle heart is down here')
      break
    case 2:
      heartBreakClick.value = !heartBreakClick.value
      if (heartBreakClick.value) {
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
      <p class="small-text">{{ likes }} likes</p>
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
