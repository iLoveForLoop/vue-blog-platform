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

const closePopover = () =>{
    emit('closePopover', false)
}
</script>

<template>
  <div @click.self="closePopover" class="backdrop poppins-regular ">
        <div class="bg-dark w-25 z-3 d-flex justify-content-center rounded-2">
            <ul class="d-flex flex-column align-items-center justify-content-center gap-2 p-3 pb-0">
                <li @click="handleDelete" class="text-danger">Delete</li>
                <li @click="openEdit" class="text-light">Edit</li>
            </ul>
        </div>
  </div>
</template>

<style>
    .backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(32, 32, 32, 0.5) !important;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

ul{
    list-style: none;
    padding: 0;
    
}

li{
    cursor: pointer;
}
</style>