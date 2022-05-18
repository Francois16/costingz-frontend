<script>
import Navbar from "./components/ui/navbar.vue";
export default {
  components: { Navbar },
};
</script>

<template>
  <main class="bg-gray-50 min-h-screen min-w-full m-0 p-0">
    <Navbar />
    <RouterView />
  </main>
</template>

<style>
</style>
