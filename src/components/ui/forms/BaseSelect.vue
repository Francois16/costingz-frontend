<script setup>
  import { Icon } from "@iconify/vue";

  import HelpText from "@/components/ui/forms/helpText.vue";

  const props = defineProps({
    label: { type: String },
    options: { type: Object, required: true },
    modelValue: { type: [String, Number], required: true },
    helpText: { type: String },
  });
</script>

<template>
  <div class="flex flex-col">
    <label v-if="label" class="mb-1" for="unit">
      {{ label }}
    </label>

    <div class="select-container">
      <select
        v-model="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      >
        <option value="" selected hidden>
          --- Please select an option ---
        </option>
        <optgroup v-for="(choices, key) in options" :label="key">
          <option :value="choice[0]" v-for="choice in choices">
            {{ choice[1] }}
          </option>
        </optgroup>
      </select>
      <Icon icon="majesticons:selector-line" class="icon" />
    </div>

    <HelpText :text="helpText" />
  </div>
</template>

<style scoped>
  .select-container {
    @apply border rounded flex items-center justify-between relative overflow-hidden;
  }

  select {
    @apply bg-white cursor-pointer h-full w-full py-2 pr-6 pl-3 appearance-none;
  }

  .icon {
    @apply right-2 absolute pointer-events-none;
  }
</style>
