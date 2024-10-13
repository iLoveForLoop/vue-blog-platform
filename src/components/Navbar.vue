<script setup>
</script>

<template>
  <!-- <div
    class="navbar bg-body-secondary py-3 px-5 d-flex justify-content-between poppins-regular"
  >
    <div class="">
      <a class="fs-3 text-bg-dark p-2 rounded" href="#">
        <i class="bi bi-bootstrap-fill"></i>
        Bayking
      </a>
    </div>

    <div class="d-flex gap-4 fs-5">
      <router-link to="/create" class="text-dark text-decoration-none"
        >Create</router-link
      >
      <router-link to="/" class="text-dark text-decoration-none"
        >Home</router-link
      >
      <router-link to="/profile" class="text-dark text-decoration-none"
        >Profile</router-link
      >
    </div>

    <div class="">
      <a class="text-dark small-text text-decoration-none" href="#"> Logout </a>
    </div>
  </div> -->

  <div class="bg-body-secondary py-2 poppins-regular">
    <div class="row">
      <div class="col-3 d-flex justify-content-start ps-5">
        <a class="fs-3 text-dark p-2 text-decoration-none" href="#">
          <i class="bi bi-bootstrap-fill"></i>
          Rants
        </a>
      </div>
      <div class="col-6 d-flex justify-content-between align-items-center pad">
        <router-link to="/create" class="text-dark text-decoration-none"
          >Create</router-link
        >
        <router-link to="/" class="text-dark text-decoration-none"
          >Rants</router-link
        >
        <router-link to="/profile" class="text-dark text-decoration-none"
          >Profile</router-link
        >
      </div>
      <div class="col-3 d-flex justify-content-end align-items-center pe-5">
        <a class="text-dark small-text text-decoration-none" href="#">
          <i class="bi bi-gear"></i>
        </a>
      </div>
    </div>
  </div>
</template>


<style scoped>
.small-text {
  font-size: 2em;
}

.pad {
  padding: 0 5em;
}
</style>
