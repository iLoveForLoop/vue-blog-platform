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
    class="bg-light content-based d-flex flex-column justify-content-start align-items-start text-dark fw-light ts rounded gap-1 shadow-lg z-3 p-2"
  >
    <div
      class="m-0 box rounded d-flex w-100 justify-content-start pointer gap-2 p-2"
      @click="openEdit"
    >
      <i class="bi bi-pencil"></i>
      <p class="m-0">Edit</p>
    </div>

    <div
      class="m-0 box rounded d-flex w-100 justify-content-start pointer gap-2 p-2"
      @click="handleDelete"
    >
      <i class="bi bi-trash3"></i>
      <p class="m-0">Delete</p>
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
