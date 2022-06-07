<script setup>
import { onBeforeMount } from "vue";
import { useAuthStore } from "../stores/useAuth.js";

const auth = useAuthStore();

onBeforeMount(() => {
  auth.checkAuthentication();
});
</script>

<template>
  <div class="container">
    <h1>Home</h1>
    <p>user is authenticated: {{ auth.isAuthenticated }}</p>
  </div>
</template>
