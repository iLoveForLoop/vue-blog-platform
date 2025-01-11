<script setup>
</script>

<template>
  <div
    class="pos border-b d-flex justify-content-center align-items-center gap-5 w-100 text-light py-3 bg-transparent bg-opacity-75 blur">
    <p class="m-0">For you</p>
    <p class="m-0">Following</p>
  </div>
</template>



<style scoped>
.pos {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  z-index: 1;
}

.blur {
  backdrop-filter: blur(15px);
  /* background: rgba(0, 0, 0, 0.5); */
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  /* border-radius: 0 !important; */
}
</style>
