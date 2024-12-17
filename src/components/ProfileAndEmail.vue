<script setup>
const props = defineProps({
  profilePic: {},
  email: {},
  textsize: {},
})

const emailFontSize = `font-size: ${props.textsize}em`
</script>

<template>
  <div class="d-flex justify-content-start align-items-center gap-2">
    <img class="circle" :src="profilePic" alt="pic" />
    <p v-if="email" class="m-0 name-size">
      {{ email }}
    </p>
  </div>
</template>



<style scoped>
.name-size {
  font-size: 0.8em;
}
</style>
