<script setup></script>

<template>
  <div class="loader-container">
    <div class="title"></div>
    <div class="grid sm:(grid-cols-2) gap-3">
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
      <div class="field"></div>
    </div>
    <div class="button"></div>
  </div>
</template>

<style scoped>
  .loader-container {
    @apply bg-white shadow-2xl max-w-2xl p-10 rounded flex flex-col;
  }
  .title,
  .field,
  .button {
    animation: pulse 1.5s infinite;
    @apply inline-block bg-gray-200 h-10 rounded;
  }

  .title {
    @apply w-1/3 mb-10;
  }

  .field {
    @apply w-full;
  }

  .button {
    @apply w-32 self-end mt-10;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
