<script setup>
import VerifySuccess from './animations/VerifySuccess.vue'
import SentSuccess from './animations/SentSuccess.vue'
import { ref } from 'vue'

const props = defineProps({
  email: String,
  code: String,
})

const emit = defineEmits(['closePopover', 'isEmailVerified'])

const { email, code } = props
const myCode = ref('')
const error = ref(false)

const closePopover = () => {
  emit('closePopover', false)
}

const isEmailVerified = () => {
  if (code == myCode.value) {
    emit('isEmailVerified', true)
  } else {
    error.value = true
    setTimeout(() => {
      error.value = false
    }, 2000)
  }
}
</script>

<template>
  <div class="backdrop poppins-regular">
    <div
      class="modal-color w-50 h-50 z-3 d-flex flex-column justify-content-center align-items-center rounded-3 p-3 position-relative"
    >
      <i
        @click="closePopover"
        class="bi bi-x-circle-fill text-danger fs-3 x-pos"
      ></i>
      <p class="m-0">
        Verification code sent to
        <span class="text-success">{{ email }}</span>
      </p>
      <SentSuccess class="p-3" />
      <input
        v-model="myCode"
        class="w-50 p-1 text-center"
        type="text"
        placeholder="Enter verification code"
      />
      <div class="w-100 text-center pt-1" style="height: 3vh">
        <transition name="fade">
          <p v-if="error" class="m-0 text-danger" style="font-size: 0.9em">
            Code doesn't match
          </p>
        </transition>
      </div>

      <button @click="isEmailVerified" class="btn btn-success rounded mt-2">
        Verify
      </button>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5) !important;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.modal-color {
  background-color: #d5cfcf;
}

input::placeholder {
  text-align: center;
}

.x-pos {
  position: absolute;
  top: 0.2em;
  right: 0.4em;
}

.box {
  transition: 0.3s ease-in-out;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.fade-enter {
  opacity: 0;
  transition: opacity 0.5s ease;
}
.fade-leave-to {
  transition: opacity 0.5s ease;
  opacity: 0;
}
</style>
