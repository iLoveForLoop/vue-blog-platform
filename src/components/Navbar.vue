<script setup>
</script>

<template>
  <div
    class="bg-body-secondary py-2 poppins-regular d-flex justify-content-between"
  >
    <div class="col-3 d-flex justify-content-start ps-5">
      <a class="fs-3 text-dark p-2 text-decoration-none" href="#">
        <i class="bi bi-bootstrap-fill"></i>
        Rants
      </a>
    </div>

    <div class="col-3 d-flex justify-content-end align-items-center pe-5">
      <div class="container">
        <form class="d-flex" role="search">
          <input
            class="form-control me-2 rounded-pill border border-2 border-dark custom-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="border-0 bg-transparent fs-5" type="submit">
            <i class="bi bi-search"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<style scoped>
.small-text {
  font-size: 1.5em;
}

.pad {
  padding: 0 5em;
}

.custom-input:focus {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  background-color: #f9fdf9;
  outline: none;
}
</style>
