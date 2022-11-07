<script setup>
  import { useAuthStore } from "../../stores/useAuth";
  import { RouterLink, useRouter } from "vue-router";
  import { useToast } from "vue-toastification";

  const router = useRouter();
  const auth = useAuthStore();
  const toast = useToast();

  function logout() {
    auth.logout();
    toast.info("Successfully logged out!");
    router.push("/login");
  }
</script>

<template>
  <header class="min-h-16 flex">
    <nav class="container flex items-center justify-between">
      <RouterLink to="/" class="text-2xl font-semibold font-display">
        Costingz
      </RouterLink>

      <div v-if="!auth.isAuthenticated" class="hidden sm:(flex)">
        <router-link
          to="/login"
          class="bg-sky-800 p-3 rounded-md font-bold text-white"
        >
          Login
        </router-link>
      </div>
      <div v-else class="flex items-center justify-center gap-3">
        <RouterLink to="/pricing">Pricing</RouterLink>
        <button class="text-red-700 p-3 font-bold rounded-md" @click="logout">
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
