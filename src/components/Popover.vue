<script setup>
import { deletePost } from '@/composables/deletePost'
import { deleteComment } from '@/composables/deleteComment'
import {} from 'vue'

const props = defineProps({
  id: {},
  from: String,
})

const emit = defineEmits(['openEdit'])

const { id, from } = props

const handleDelete = async () => {
  if (from == 'post') {
    await deletePost(id)
  }

  if (from == 'comment') {
    await deleteComment(id)
    console.log('Delete comment')
  }
}

const openEdit = () => {
  emit('openEdit', true)
}
</script>

<template>
  <div
    class="bg-light content-based d-flex flex-column justify-content-center align-items-center text-dark p-3 fw-light ts rounded gap-3 shadow-lg z-3"
  >
    <div
      class="m-0 box px-3 py-2 rounded w-100 d-flex justify-content-center pointer"
      @click="openEdit"
    >
      <p class="m-0">Edit</p>
      <i class="bi bi-pencil"></i>
    </div>

    <div
      class="m-0 box px-3 py-2 rounded w-100 d-flex justify-content-between pointer"
      @click="handleDelete"
    >
      <p class="m-0">Delete</p>
      <i class="bi bi-trash3"></i>
    </div>
  </div>
</template>


<style>
.content-based {
  width: fit-content;
  height: fit-content;
}

.ts {
  font-size: 0.8em;
}

.box {
  transition: 0.2s ease-in-out;
}

.box:hover {
  background: rgb(172, 172, 172);
}

.pointer {
  cursor: pointer;
}
</style>
