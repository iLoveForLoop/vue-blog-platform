<script setup>
import VerifySuccess from './VerifySuccess.vue'
</script>

<template>
  <div class="backdrop poppins-regular">
    <div
      class="modal-color w-25 h-50 z-3 d-flex flex-column justify-content-center align-items-center rounded-3 p-3 position-relative"
    >
      <VerifySuccess class="p-3" />
      <p>Verification Success!</p>
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

.modal-color {
  background-color: #d5cfcf;
}
</style>
