<script setup>
import { onMounted, ref } from 'vue'
import { updateComment } from '@/composables/updateComment'
import { useStore } from 'vuex'

const props = defineProps({
  comment: {},
})

const emit = defineEmits(['closeEdit'])
const store = useStore()

const { comment } = props

const myEditComment = ref(null)
const editedComment = ref(comment.content)
const error = ref(null)

const handleSubmit = async () => {
  if (editedComment.value.trim() !== '') {
    try {
      await updateComment(comment.id, editedComment.value)
      closeEdit()
    } catch (error) {
      console.log(error.message)
    }
  } else {
    error.value = "You can't leave me empty par :("
    setTimeout(() => {
      error.value = null
    }, 2000)
  }
}

const closeEdit = () => {
  store.commit('setIsComponentOverLapping', false)
  emit('closeEdit', false)
}

const closeOnEscape = (e) => {
  console.log('triggered')
  if (e.key == 'Escape') {
    closeEdit()
  }
}

onMounted(() => {
  myEditComment.value.focus()
  myEditComment.value.addEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <div class="back d-flex flex-column justify-content-center align-items-center poppins-regular"
    @mousedown.self="closeEdit" ref="myEditComment" tabindex="0">
    <transition name="slide">
      <div class="alert alert-danger errpos" role="alert" v-if="error" style="z-index: 11">
        {{ error }}
      </div>
    </transition>
    <div class="text-light text-center p-3 bg-gray border-b rounded-top" style="width: 40%">
      <p class="m-0">Edit comment</p>
    </div>
    <div class="rounded-bottom bg-gray d-flex" style="height: 65vh; width: 40%">
      <form @submit.prevent="handleSubmit" class="d-flex flex-column justify-content-between w-100 p-3 pb-4">
        <div class="d-flex flex-column flex-grow-1 w-100">
          <div class="d-flex justify-content-start align-items-center gap-3">
            <img class="create-circle" :src="comment?.user.photoURL
              ? comment?.user.photoURL
              : 'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'
              " alt="user" @click="toggleProfileChange" />
            <p class="m-0 text-light" style="font-size: 1em">
              {{ comment?.user.displayName }}
            </p>
          </div>

          <textarea class="form-control w-100 bg-transparent no-border my-border text-light px-3 mt-3 flex-grow-1"
            v-model="editedComment" ref="myTextArea"></textarea>
        </div>

        <!-- <p class="text-info m-0 text-end">Share</p> -->
        <button type="submit" class="btn my-border rounded-pill mt-4 text-light w-100 btn-u">
          <a class="text-decoration-none">Save</a>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 11;
  background: rgba(0, 0, 0, 0) !important;
}

.back:focus {
  outline: none;
}

.bg-gray {
  background: rgb(52, 51, 51);
}

.no-border {
  outline: none !important;
  box-shadow: none !important;
  border: none;
  resize: none;
  caret-color: white;
  font-size: 1em;
}

.create-circle {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
}

.custom-border {
  border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 0 !important;
}

.border-t {
  border-top: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 0 !important;
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  /* border-radius: 0 !important; */
}

.btn-u {
  transition: 0.2s ease-in-out;
}

.btn-u:hover {
  background-color: rgb(231, 231, 231);
  color: black !important;
}

textarea::placeholder {
  color: white;
  font-weight: 100;
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
  transform: translateX(-50%);
  /* Start position off-screen */
  opacity: 0;
  /* Optional: fade in along with the slide */
}

.slide-leave-to {
  opacity: 0;
  /* Optional: fade out along with the slide */
}
</style>
