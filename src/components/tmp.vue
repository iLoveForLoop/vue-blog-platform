<template></template>

<script setup>
const toggle = async data => {
  switch (data) {
    case 1:
      if (!alreadyLiked.value) {
        try {
          const likeData = {
            post_id: post.id,
            user_id: post.user.id,
            created_at: Timestamp.now(),
          }
          await addLike(likeData)
        } catch (err) {
          console.log(err.message)
        }
      } else {
        deleteLike(like_id.value)
        alreadyLiked.value = !alreadyLiked.value
      }

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

<style>
</style>
