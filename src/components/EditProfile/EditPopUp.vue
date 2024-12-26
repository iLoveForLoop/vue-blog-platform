<script setup>
import { ref, onMounted, nextTick } from 'vue'

import { isUsernameTaken } from '@/composables/emailAndUsernameChecker'
const props = defineProps({
  type: String,
  text: String,
})

const emit = defineEmits(['close-popover', 'send-data'])
const error = ref(null)

const myTextArea = ref(null)
const type = ref(props.type)
const text = ref(props.text)

const sendData = async () => {
  if (type.value == 'username') {
    if (!(await isUsernameTaken(text.value))) {
      console.log('sending new username', type.value, text.value)
      emit('send-data', { type: type.value, text: text.value })
      emit('close-popover')
    } else {
      error.value = 'Wag nang agawin par, may nag mamayari na!'
      setTimeout(() => {
        error.value = null
      }, 2000)
    }
  } else {
    console.log('sending biot', type.value, text.value)

    emit('send-data', { type: type.value, text: text.value })
    emit('close-popover')
  }
}

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
    @click.self="emit('close-popover')"
  >
    <transition name="slide">
      <div class="alert alert-danger errpos" role="alert" v-if="error">
        {{ error }}
      </div>
    </transition>
    <div class="w-50 main-bg rounded-5" style="height: 40vh">
      <div
        class="d-flex justify-content-between p-4 align-items-center border-b"
      >
        <p
          class="text-light m-0"
          @click="emit('close-popover')"
          style="cursor: pointer"
        >
          Cancel
        </p>
        <p class="text-light m-0">Edit {{ type }}</p>
        <p @click="sendData" class="text-light m-0" style="cursor: pointer">
          Save
        </p>
      </div>
      <div>
        <textarea
          ref="myTextArea"
          v-model="text"
          class="form-control bg-transparent no-border px-3 mt-3 text-secondary"
          :maxlength="type == 'bio' ? '50' : '29'"
          @keydown.enter.prevent="sendData"
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
  background: rgba(0, 0, 0, 0);
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

.errpos {
  position: fixed;
  right: 1em;
  top: 1em;
  transition: 0.3s ease-in-out;
}

.slide-enter-active {
  opacity: 0;
  transform: translateX(-50%);
  transition: 0.5s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-enter {
  transform: translateX(-50%); /* Start position off-screen */
  opacity: 0; /* Optional: fade in along with the slide */
}
.slide-leave-to {
  opacity: 0; /* Optional: fade out along with the slide */
}
</style>
