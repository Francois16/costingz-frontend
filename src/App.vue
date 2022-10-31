<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/useAuth.js";

const auth = useAuthStore();
auth.setUserAuthenticationStatus();
</script>

<template>
  <RouterView />
</template>

<style></style>
