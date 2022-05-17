<script>
import Navbar from "./components/ui/navbar.vue";
export default {
  components: { Navbar },
};
</script>

<template>
  <main class="container">
    <Navbar />
    <RouterView />
  </main>
</template>

<style>
</style>
