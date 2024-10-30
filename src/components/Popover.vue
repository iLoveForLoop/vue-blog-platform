<script setup>
import { deletePost } from '@/composables/deletePost'
const props = defineProps({
  id: {},
})

const { id } = props

const handleDelete = () => [deletePost(id)]
</script>

<template>
  <div
    class="bg-light content-based d-flex flex-column justify-content-center align-items-center text-dark p-3 fw-light ts rounded gap-3 shadow-lg z-3"
  >
    <div class="m-0 box px-3 py-2 rounded w-100 d-flex justify-content-center">
      <p class="m-0">Edit</p>
      <i class="bi bi-pencil"></i>
    </div>

    <div class="m-0 box px-3 py-2 rounded w-100 d-flex" @click="handleDelete">
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
  background: rgb(197, 187, 187);
}

.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
}
</style>
