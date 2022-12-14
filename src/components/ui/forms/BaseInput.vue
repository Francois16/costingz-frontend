<script setup>
  const props = defineProps({
    label: { type: String },
    modelValue: { type: [String, Number], default: "" },
    helpText: { type: String, default: "" },
    icon: { required: false },
  });
</script>

<template>
  <div class="flex flex-col group">
    <label
      :for="$attrs.name"
      class="mb-1 group-focus-within:(text-primary) duration-200"
    >
      {{ label }}
    </label>
    <div
      class="border rounded duration-200 group-focus-within:( border-primary) flex items-center gap-1 overflow-hidden"
    >
      <span v-if="icon" class="text-muted select-none">{{ icon }}</span>
      <input
        type="text"
        class="focus:(outline-none) py-2 px-5 w-full"
        :value="modelValue"
        v-bind="$attrs"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="helpText" class="text-xs text-muted">
      {{ helpText }}
    </p>
  </div>
</template>
