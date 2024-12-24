<script setup>
import EditPopUp from './EditPopUp.vue'
</script>

<template>
  <EditPopUp type="bio" text="this is a bio" />
  <div
    class="back d-flex flex-column align-items-center justify-content-center poppins-regular"
  >
    <div
      class="bg-gray text-light text-center p-3 bg-gray border-b rounded-top-4"
      style="width: 40%"
    >
      <p class="m-0">Edit Profile</p>
    </div>
    <div
      class="rounded-bottom-4 bg-gray d-flex"
      style="height: 65vh; width: 40%"
    >
      <form
        @submit.prevent=""
        class="d-flex flex-column justify-content-between w-100 p-3 pb-4"
      >
        <div class="text-light d-flex flex-column flex-grow-1 w-100 gap-4">
          <div class="d-flex flex justify-content-start align-items-start">
            <div class="d-flex flex-column flex-grow-1 w-100 gap-2">
              <p class="m-0">Username</p>
              <div class="border-b w-100 pb-2">
                <p class="m-0 fw-lighter">jefersonbayking</p>
              </div>
            </div>
            <img
              class="circle"
              :src="'https://res.cloudinary.com/dgfjrmpfn/image/upload/v1733405834/ofc-default-profile_vjgusy.jpg'"
              alt="user"
              @click="toggleProfileChange"
            />
          </div>

          <div
            class="d-flex flex-column justify-content-start align-items-start gap-2"
          >
            <p class="m-0">Bio</p>
            <div class="border-b w-100 pb-2">
              <p class="m-0 fw-lighter">this is a bio</p>
            </div>
          </div>

          <div
            class="d-flex flex-column justify-content-start align-items-start gap-2"
          >
            <p class="m-0">Email</p>
            <div class="border-b w-100 pb-2">
              <p class="m-0 fw-lighter">jefbay110@gmail.com</p>
            </div>
          </div>
        </div>

        <!-- <p class="text-info m-0 text-end">Share</p> -->
        <button
          type="submit"
          class="btn my-border rounded-pill mt-4 text-light w-100 btn-u"
        >
          <a class="text-decoration-none">Save</a>
        </button>
      </form>
    </div>
  </div>
</template>


<style scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 11;
  background: rgba(0, 0, 0, 0) !important;
}

.bg-gray {
  background: rgb(52, 51, 51);
}

.border-b {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
  /* border-radius: 0 !important; */
}

.btn-u {
  transition: 0.2s ease-in-out;
}

.btn-u:hover {
  background-color: rgb(231, 231, 231);
  color: black !important;
}

.circle {
  border-radius: 50%;
  /* width: 200px;  */
  height: 60px;
  width: 60px;
  object-fit: cover; /* Ensures the image is cropped */
  object-position: center;
}
</style>
