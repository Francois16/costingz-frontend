<script>
import { mapStores } from "pinia";
import { useAuthUserStore } from "../stores/authUserStore";

export default {
  computed: {
    ...mapStores(useAuthUserStore)
  }
}

</script>

<template>
  <div class="container">
    <h1>Home</h1>
    <p>user is authenticated: {{ authStore.isAuthenticated }}</p>
  </div>
</template>
