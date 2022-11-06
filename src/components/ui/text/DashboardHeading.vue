<script setup></script>

<template>
  <div
    class="flex items-center justify-between text-3xl uppercase font-semibold my-10"
  >
    <div class="flex items-center gap-3">
      <div class="flex p-2 rounded-full bg-white">
        <slot name="icon"></slot>
      </div>
      <slot name="heading">Default Heading</slot>
    </div>

    <slot name="button"></slot>
  </div>
</template>
