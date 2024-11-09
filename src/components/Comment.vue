<script setup>
import Popover from './Popover.vue'
import Actions from './Actions.vue'
import { ref } from 'vue'
import EditPost from './EditPost.vue'

const isEdit = ref(false)

const props = defineProps({
  comment: [{}],
  isFromProfile: { type: Boolean, default: false },
})

const showPopover = ref(false)

const togglePopover = () => {
  showPopover.value = !showPopover.value
}

const closePopover = () => {
  showPopover.value = false
}

const closeEdit = data => {
  isEdit.value = data
}

const openEdit = data => {
  isEdit.value = data
  showPopover.value = false
}
</script>

<template>
  <div
    class="poppins-regular w-100 d-flex flex-column align-items-center justify-content-center text-dark p-3 pb-0 pt-0"
  >
    <div class="backdrop" v-if="showPopover" @click.self="closePopover"></div>
    <div
      class="w-75 d-flex flex-column justify-content-start py-0 rounded"
      style="height: auto"
    >
      <div class="bg-light line" style="height: 3vh"></div>

      <!-- <div
        class="bg-light rounded-pill p-2 px-3 d-flex align-items-center justify-content-between content-based"
      >
        <p class="p-0 m-0 name-size">

          This is a sample
        </p>
      </div> -->

      <div
        class="bg-light rounded py-3 px-4 d-flex flex-column justify-content-start content-based"
      >
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-person-circle fs-5"></i>
          <p class="p-0 m-0 name-size emailFSize">
            <!--username-->
            jefbay110@gmail.com
          </p>
        </div>
        <div class="ps-4">
          <p class="p-0 m-0 fw-light">
            <!--comment content-->

            {{ props.comment.content }}
          </p>
        </div>
      </div>

      <div class="px-3 d-flex justify-content-left align-items-center">
        <!-- <Actions :post="props.comment" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  width: 2px;
  height: 1vh;
  margin-left: 10%;
}

.backdrop {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  top: 0;
  left: 0;
}

.content-based {
  width: fit-content;
  height: fit-content;
}

.emailFSize {
  font-size: 0.8em;
  font-weight: 450;
}
</style>
