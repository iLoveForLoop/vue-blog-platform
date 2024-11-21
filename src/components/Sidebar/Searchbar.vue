<script setup>
</script>

<template>
  <div class="main-bg d-flex flex-column w-50 gap-0 l-border poppins-regular">
    <form class="d-flex px-4 mt-2" style="height: 6vh" role="search">
      <div
        class="search-logo bg-gray text-light d-flex justify-content-center align-items-center ps-2 pe-0"
      >
        <i class="bi bi-search opacity-50"></i>
      </div>
      <input
        class="form-control me-2 search-bar bg-gray border-0 text-light"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </form>
  </div>
</template>

<style scoped>
.search-bar {
  border-radius: 0;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
}

.search-logo {
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
}

input[type='search']:focus {
  outline: none;
  box-shadow: none;
  border-color: #ffffff;
}

input::placeholder {
  color: rgb(255, 255, 255);
  opacity: 0.5;
}

.l-border {
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}

.bg-gray {
  background-color: #292929;
}
</style>
