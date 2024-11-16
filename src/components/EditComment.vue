<script setup>
import { ref } from 'vue'
import { updateComment } from '@/composables/updateComment'

const props = defineProps({
  content: {},
  id: {},
})

const emit = defineEmits(['closeEdit'])

const { content, id } = props

const editedComment = ref(content)

const handleSubmit = async () => {
  try {
    await updateComment(id, editedComment.value)
    emit('closeEdit', false)
  } catch (error) {
    console.log(error.message)
  }
}

const closeEdit = () => {
  emit('closeEdit', false)
}
</script>

<template>
  <div
    class="backdrop d-flex justify-content-center align-items-center"
    @click.self="closeEdit"
  >
    <div class="w-25 bg-light z-3 rounded px-2 pt-3" style="height: ">
      <p class="m-0 p-0 text-center">Edit your comment</p>
      <form class="p-3 text-end" @submit.prevent="handleSubmit">
        <textarea
          class="w-100"
          style="height: 10vh"
          v-model="editedComment"
        ></textarea>
        <button
          type="submit"
          class="btn btn-info mt-2"
          style="font-size: smaller"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5) !important;
  z-index: 20;
}
</style>
