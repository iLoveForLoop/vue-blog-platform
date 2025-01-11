<script setup>
import { computed, onMounted, ref } from 'vue';

const num = 7



const isOverflowing = computed(() => num > 8 ? 'overflow-auto' : 'hidescrollbar')

</script>

<template>
  <div class="w d-flex flex-column min-vh-100 bg-info position-absolute poppins-regular p-3 overflow-auto"
    style="top: 0; left: 4.2em; right: 0; bottom: 0;">
    <h4 class="text-light mb-5">Notifications</h4>
    <div class="" v-for="n in num" :key="n">
      <div class="d-flex justify-content-start align-items-center gap-2 p-2 mb-3">
        <img class="my-circle"
          :src="'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'"
          alt="pic" />
        <p class="m-0" style="font-size: .9em;">jefersonbayking liked you</p>
      </div>
    </div>
  </div>
</template>







<style scoped>
.w {
  max-width: 320px;
  min-width: 320px;
  z-index: 2;
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
