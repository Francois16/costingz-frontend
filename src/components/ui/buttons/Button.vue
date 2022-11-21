<script setup>
  defineProps({ text: { type: String, default: "Submit" } });
</script>

<template>
  <button
    class="self-end border-2 border-teal-600 text-teal-600 py-2 px-5 hover:(bg-teal-600 text-white) duration-200 rounded font-semibold"
    v-bind="$attrs"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
