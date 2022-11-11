<script setup>
  defineProps({
    label: { type: String },
    modelValue: { type: [String, Number], default: "" },
    helpText: { type: String, default: "" },
  });
</script>

<template>
  <div class="relative">
    <input
      v-bind="$attrs"
      class="block px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder=" "
    />
    <label
      :for="$attrs.name"
      class="absolute text-sm text-muted duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
    >
      {{ label }}
    </label>
    <p v-if="helpText" class="mt-2 text-xs text-muted">
      {{ helpText }}
    </p>
  </div>
</template>
