<script setup></script>

<template>
  <div
    class="flex items-center justify-between text-3xl uppercase font-semibold my-10"
  >
    <div class="flex items-center gap-3">
      <slot name="icon"></slot>
      <slot name="heading">Default Heading</slot>
    </div>

    <slot name="button"></slot>
  </div>
</template>
