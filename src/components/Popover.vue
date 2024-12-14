<script setup>
import { deletePost } from '@/composables/deletePost'
import { deleteComment } from '@/composables/deleteComment'
import {} from 'vue'

const props = defineProps({
  id: {},
  from: String,
})

const emit = defineEmits(['openEdit', 'closePopover'])

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

const closePopover = () => {
  emit('closePopover', false)
}
</script>

<template>
  <div @click.self="closePopover" class="backdrop poppins-regular">
    <div
      class="modal-color w-25 z-3 d-flex justify-content-center rounded-3 p-0"
    >
      <ul
        class="d-flex flex-column align-items-center justify-content-evenly m-0 p-0 w-100"
      >
        <li
          @click="handleDelete"
          class="text-danger w-100 text-center py-3 border-bt"
        >
          Delete
        </li>
        <li
          @click="openEdit"
          class="text-light w-100 text-center py-3 border-bt"
        >
          Edit
        </li>
        <li @click="closePopover" class="text-light w-100 text-center py-3">
          Cancel
        </li>
      </ul>
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

ul {
  list-style: none;
  padding: 0;
}

li {
  cursor: pointer;
}

.border-bt {
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
}

.modal-color {
  background-color: #2d2c2c;
}
</style>
