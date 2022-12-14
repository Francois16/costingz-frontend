<script setup>
  import { ref, computed } from "vue";
  import { Icon } from "@iconify/vue";
  import { OnClickOutside } from "@vueuse/components";

  import HelpText from "@/components/ui/forms/HelpText.vue";

  const props = defineProps({
    label: { type: String, required: true },
    helpText: { type: String, required: false },
    modelValue: { type: [Number, String], default: "please select an option" },
    options: { type: Array, required: true },
  });

  const show = ref(false);

  const selectedOption = computed(() => {
    return props.options.find((option) => option.value == props.modelValue)
      .label;
  });

  // Closes the Listbox dropdown
  const close = () => {
    show.value = false;
  };
</script>

<template>
  <OnClickOutside @trigger="close">
    <p class="mb-1" :class="show && 'text-primary'">{{ label }}</p>
    <div
      tabindex="0"
      @click="show = !show"
      class="select"
      :class="show ? 'select__open' : 'select__closed'"
    >
      {{ selectedOption }}
      <Icon icon="majesticons:selector-line" />
      <Transition name="fade">
        <ul v-if="show" class="dropdown">
          <li
            class="dropdown__item"
            @click="$emit('update:modelValue', option.value)"
            :class="option.value == modelValue && 'selected-item'"
            v-for="(option, i) in options"
            :key="i"
          >
            <span class="select-none">{{ option.label }}</span>
            <Icon v-if="option.value == modelValue" icon="tabler:check" />
          </li>
        </ul>
      </Transition>
    </div>
    <HelpText :text="helpText" />
  </OnClickOutside>
</template>

<style scoped>
  .select {
    @apply select-none outline-none duration-200 flex items-center justify-between relative cursor-pointer px-5 py-2;
  }

  .select__open {
    /* Using border-left & border-right becuase windicss causes error (but works) with border-x class */
    border-left: 1px solid;
    border-right: 1px solid;
    @apply border-t rounded-t border-primary outline-none;
  }

  .select__closed {
    @apply border rounded;
  }

  .dropdown {
    @apply absolute bg-white top-full -inset-x-[1px] rounded-b border border-primary z-10 max-h-52 overflow-y-scroll;
  }

  .dropdown__item {
    @apply px-2 py-1.5 flex items-center justify-between gap-1 hover:(bg-primary text-white) duration-200 select-none;
  }

  .selected-item {
    @apply bg-primary text-white cursor-default;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
