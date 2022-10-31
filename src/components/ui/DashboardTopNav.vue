<script setup>
import { Icon } from "@iconify/vue";
import { useAuthStore } from "../../stores/useAuth";

const auth = useAuthStore();
</script>

<template>
  <div class="py-6 flex justify-between items-center">
    <div
      class="bg-white flex items-center gap-2 border-2 rounded pr-2 focus:(outline-none) focus-within:(border-primary)"
    >
      <input
        class="py-2 border-none focus:(outline-none ring-transparent)"
        type="search"
        placeholder="Search"
      />
      <Icon icon="tabler:search" />
    </div>

    <div>
      <div class="flex items-center justify-center gap-2">
        <img class="rounded-full w-6 h-6" src="@/assets/images/avatar.png" />
        <button class="flex items-center gap-1 capitalize">
          {{ auth.user.first_name }} {{ auth.user.surname }}
          <Icon icon="tabler:chevron-down" />
        </button>
      </div>
    </div>
  </div>
</template>
