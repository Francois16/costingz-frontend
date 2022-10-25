<script setup>
import Navbar from "../components/ui/navbar.vue";
import { useAuthStore } from "../stores/useAuth";

const auth = useAuthStore();
</script>

<template>
  <Navbar />
  <div class="container">
    <h1>Home</h1>
    <p>{{ auth.user }}</p>
    <p>{{ auth.isAuthenticated }}</p>
  </div>
</template>
