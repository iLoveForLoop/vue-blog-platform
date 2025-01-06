<script setup>
import { deletePost } from '@/composables/deletePost'
import { deleteComment } from '@/composables/deleteComment'
import { ref, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  id: String,
  from: String,
  fromProfile: {
    type: Boolean,
    default: false,
  },
  isMyComment: {
    type: Boolean,
    default: false,
  }
})

const store = useStore()
const emit = defineEmits(['openEdit', 'closePopover'])


const myPopover = ref(null)

const handleDelete = async () => {
  if (props.from == 'post') {
    await deletePost(props.id)
  }

  if (props.from == 'comment') {
    await deleteComment(props.id)
    console.log('Delete comment')
  }
}

const handleReport = () => {
  alert('Post Already Reported!')
  closePopover()
}

const openEdit = () => {
  emit('openEdit', true)
}

const closePopover = () => {
  store.commit('setIsComponentOverLapping', false)
  emit('closePopover', false)
}

const closeOnEscape = (e) => {
  if (e.key == 'Escape') closePopover()

}

onMounted(() => {
  console.log('Props in Popover:', props);
  if (myPopover.value) {
    myPopover.value.focus()
  }

  if (myPopover.value) {
    myPopover.value.addEventListener('keydown', closeOnEscape)
  }

})

console.log('From Popover boolean: ', props.fromProfile)
console.log('From Popover comment: ', props.isMyComment)
console.log('From Popover: ', props.id)
console.log('From Popover: ', props.from)


</script>

<template>
  <div @mousedown.self="closePopover" class="backdrop poppins-regular" ref="myPopover" tabindex="0">
    <div class="modal-color w-25 z-3 d-flex justify-content-center rounded-3 p-0">
      <ul class="d-flex flex-column align-items-center justify-content-evenly m-0 p-0 w-100">
        <li v-if="fromProfile || isMyComment" @click="handleDelete"
          class="text-danger w-100 text-center py-3 border-bt">
          Delete
        </li>
        <li v-if="fromProfile || isMyComment" @click="openEdit" class="text-light w-100 text-center py-3 border-bt">
          Edit
        </li>
        <li v-if="!fromProfile && !isMyComment" @click="handleReport"
          class="text-danger w-100 text-center py-3 border-bt">
          Report
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
  background: rgba(0, 0, 0, 0) !important;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.backdrop:focus {
  outline: none;
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
