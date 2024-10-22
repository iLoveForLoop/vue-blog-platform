<script setup>
const props = defineProps({
  post: [{}],
})
</script>


<template>
  <h1 class="text-light">
    {{ props.post.content }}
  </h1>
  <p class="text-light">
    {{ props.post.created_at.toDate().toLocaleString() }}
  </p>
</template>

<style>
</style>
