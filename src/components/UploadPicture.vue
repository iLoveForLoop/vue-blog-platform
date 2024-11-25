<script setup>
import { ref } from 'vue'
const pictureInput = ref(null)

const toggleUpload = () => {
  pictureInput.value.click()
}
</script>

<template>
  <div>
    <input ref="pictureInput" type="file" class="d-none" />
    <button class="btn btn-info rounded-pill" @click="toggleUpload">
      Upload a picture
    </button>
  </div>
</template>

<style>
</style>
