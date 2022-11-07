<script setup>
  import { RouterView, useRoute } from "vue-router";
  import { useAuthStore } from "@/stores/useAuth.js";

  import DashboardLayout from "@/components/layouts/DashboardLayout.vue";

  const route = useRoute();
  const auth = useAuthStore();
  auth.setUserAuthenticationStatus();
</script>

<template>
  <RouterView v-if="route.meta.layout == 'base'" />
  <DashboardLayout v-else>
    <template #content>
      <RouterView />
    </template>
  </DashboardLayout>
</template>

<style></style>
