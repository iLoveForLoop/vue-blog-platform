<script setup>
import Popover from './Popover.vue'
import { ref, defineEmits } from 'vue'

const props = defineProps({
  post: [{}],
  isFromProfile: { type: Boolean, default: false },
})

const showPopover = ref(props.closePopover)
const emit = defineEmits(['sendTrigger'])

const togglePopover = () => {
  showPopover.value = !showPopover.value
  emit('sendTrigger', showPopover.value)
}

const closePopover = () => {
  showPopover.value = false
}
</script>


<template>
  <div
    class="poppins-regular w-100 d-flex flex-column align-items-center justify-content-center text-dark p-5 pb-0"
  >
    <div
      class="w-75 d-flex flex-column justify-content-start p-2 rounded bg-light"
      style="height: auto"
    >
      <div class="d-flex justify-content-between">
        <div
          class="bg-light rounded-pill p-2 px-3 d-flex align-items-center justify-content-between gap-2 content-based"
        >
          <i class="bi bi-person-circle fs-5"></i>
          <p class="p-0 m-0 name-size">
            {{ props.post.user?.email }}
          </p>
        </div>

        <div
          class="p-2 px-3 d-flex align-items-center justify-content-between position-relative"
        >
          <div
            class="backdrop"
            v-if="showPopover"
            @click.self="closePopover"
          ></div>
          <Popover
            class="position-absolute pos z-3"
            v-if="showPopover"
            :id="props.post.id"
          />

          <i
            class="bi bi-three-dots"
            v-if="props.isFromProfile"
            @click="togglePopover"
          ></i>
        </div>
      </div>

      <div class="bg-light line"></div>

      <div
        class="bg-light rounded-pill p-2 px-3 d-flex align-items-center justify-content-between content-based"
      >
        <p class="p-0 m-0 name-size">
          {{ props.post.created_at.toDate().toLocaleString() }}
        </p>
      </div>

      <div class="bg-light line"></div>

      <div
        class="bg-light rounded-5 py-3 px-3 d-flex align-items-center justify-content-start"
      >
        <p class="p-0 m-0">
          {{ props.post.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.inline-d {
  display: inline-block;
}

.content-based {
  width: fit-content;
  height: fit-content;
}

.name-size {
  font-size: 0.9em;
}

.date-size {
  font-size: 0.7em;
}

.line {
  width: 2px;
  height: 1vh;
  margin-left: 10%;
}

.par {
  position: relative;
}

.pos {
  top: -220%;
  right: -210%;
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
