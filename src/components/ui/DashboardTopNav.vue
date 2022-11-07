<script setup>
  import { ref } from "vue";
  import { Icon } from "@iconify/vue";
  import { useAuthStore } from "@/stores/useAuth";

  const auth = useAuthStore();

  const navbarDropdownUser = ref(false);
</script>

<template>
  <div class="py-6 flex justify-between items-center">
    <!-- Search Bar -->
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

    <!-- User Menu -->
    <div class="relative">
      <div class="flex items-center justify-center gap-2">
        <img class="rounded-full w-6 h-6" src="@/assets/images/avatar.png" />
        <button
          @click="navbarDropdownUser = !navbarDropdownUser"
          class="flex items-center gap-1 capitalize"
        >
          {{ auth.user.first_name }} {{ auth.user.surname }}

          <Icon
            icon="tabler:chevron-down"
            class="transform duration-200"
            :class="navbarDropdownUser ? 'rotate-180' : ''"
          />
        </button>
      </div>

      <!-- Dropdown -->
      <div
        class="bg-white shadow rounded overflow-hidden absolute w-max min-w-full top-8 flex flex-col duration-200"
        :class="navbarDropdownUser ? 'opacity-100' : 'opacity-0'"
      >
        <p class="p-2">Link 1</p>
        <p class="p-2">Link 2</p>
        <p class="p-2">Link 3</p>
        <button
          @click="auth.logout"
          class="bg-red-600 text-white font-bold p-2 flex items-center justify-center gap-1 duration-200 hover:(bg-red-500)"
        >
          <Icon icon="tabler:logout" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
