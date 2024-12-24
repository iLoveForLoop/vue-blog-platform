<script setup>
import { ref, onMounted, nextTick } from 'vue'
const props = defineProps({
  type: String,
  text: String,
})

const myTextArea = ref(null)
const username = props.text

onMounted(() => {
  nextTick(() => {
    myTextArea.value.focus()
    myTextArea.value.setSelectionRange(0, 0)
  })
})
</script>

<template>
  <div
    class="backdrop d-flex justify-content-center align-items-center poppins-regular"
  >
    <div class="w-50 main-bg rounded-5" style="height: 40vh">
      <div
        class="d-flex justify-content-between p-4 align-items-center border-b"
      >
        <p class="text-light m-0">Cancel</p>
        <p class="text-light m-0">Edit {{ type }}</p>
        <p class="text-light m-0">Save</p>
      </div>
      <div>
        <textarea
          ref="myTextArea"
          v-model="username"
          class="form-control bg-transparent no-border px-3 mt-3 text-secondary"
          maxlength="30"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 12;
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  /* border-radius: 0 !important; */
}

.no-border {
  outline: none !important;
  box-shadow: none !important;
  border: none;
  resize: none;
  caret-color: white;
  font-size: 1em;
}
</style>
