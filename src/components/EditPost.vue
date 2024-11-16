<script setup>
import { ref } from 'vue'
import { updatePost } from '@/composables/updatePost'

const emit = defineEmits(['closeEdit'])

const props = defineProps({
  post: [{}],
})

const { post } = props

const postContent = ref(post.content)
const id = ref(post.id)

const editPost = async () => {
  try {
    await updatePost(id.value, postContent.value)
    closeBackdrop()
  } catch (error) {
    console.log(error.message)
  }
}

const closeBackdrop = () => {
  emit('closeEdit', false)
}
</script>

<template>
  <div
    class="backdrop d-flex justify-content-center align-items-center z-3"
    @click.self="closeBackdrop"
  >
    <div class="w-50 bg-dark p-5 rounded" style="height: 60vh">
      <div class="text-start mb-3">
        <h1 class="m-0 text-light">Edit your post</h1>
      </div>

      <form
        @submit.prevent="editPost"
        class="d-flex justify-content-center flex-column p-3"
      >
        <div>
          <textarea
            class="form-control w-100"
            v-model="postContent"
            style="height: 20vh"
          ></textarea>
        </div>
        <div>
          <button class="btn btn-warning my-5 px-5 py-2">Update Post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  z-index: 90;
}
</style>
