<script setup>
  import { RouterLink } from "vue-router";
  import { useAuthStore } from "../../stores/useAuth";

  const auth = useAuthStore();
</script>

<template>
  <header class="min-h-16 flex">
    <nav class="container flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-semibold font-display">
        Costingz
      </RouterLink>

      <div v-if="!auth.isAuthenticated" class="hidden sm:(flex)">
        <RouterLink
          to="/login"
          class="bg-sky-800 p-3 rounded-md font-bold text-white"
        >
          Login
        </RouterLink>
      </div>
      <div v-else class="flex items-center justify-center gap-3">
        <RouterLink :to="{ name: 'dashboard' }" class="">Dashboard</RouterLink>
        <RouterLink to="/pricing">Pricing</RouterLink>
        <button
          class="text-error p-3 font-bold rounded-md"
          @click="auth.logout"
        >
          Logout
        </button>
      </div>
    </nav>
  </header>
</template>

<style>
  .nav-link {
    @apply bg-sky-400 p-3 text-white font-bold rounded-md;
  }
</style>
