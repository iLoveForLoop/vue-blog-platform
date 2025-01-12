<script setup>
const emit = defineEmits(['closebar'])

const num = 5






</script>

<template>
  <div
    class="w d-flex flex-column min-vh-100 main-bg position-absolute poppins-regular p-3 overflow-auto my-border hidescrollbar"
    style="top: 0; left: 0; right: 0; bottom: 0;">
    <div class="w-100 d-flex justify-content-between align-items-center mb-5">
      <h4 class="text-light m-0">Notifications</h4>
      <i class="bi bi-arrow-left-short" @click="emit('closebar')" style="font-size: 1.9em;"></i>
    </div>
    <div class="" v-for="n in num" :key="n">
      <div class="d-flex justify-content-start align-items-start gap-2 p-2 mb-3">
        <img class="my-circle"
          :src="'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'"
          alt="pic" />
        <p class="m-0" style="font-size: .8em;">jefersonbayking liked you the quick little brown fox jumps </p>
      </div>
    </div>
  </div>
</template>







<style scoped>
.w {
  max-width: 20.5em;
  min-width: 20.5em;
  z-index: 2;
  transition: 0.3s ease-in-out;
}

.hidescrollbar {
  scrollbar-width: none !important;
}

.my-circle {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  object-fit: cover;
  object-position: center;
}
</style>
