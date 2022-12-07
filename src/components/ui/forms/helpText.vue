<script setup>
  defineProps({
    text: { type: String, required: true, default: "sexy text not provided" },
  });
</script>

<template>
  <span class="help-text">{{ text }}</span>
</template>

<style scoped>
  .help-text {
    @apply text-xs text-muted;
  }
</style>
