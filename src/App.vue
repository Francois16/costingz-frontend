<script setup>
import { RouterView } from "vue-router";
import { onBeforeMount } from "vue";
import { useAuthStore } from "@/stores/useAuth.js";

onBeforeMount(() => {
  const auth = useAuthStore();
  auth.setUserAuthenticationStatus();
});
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>

<style></style>
