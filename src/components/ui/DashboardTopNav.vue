<script setup>
  import { ref } from "vue";
  import { Icon } from "@iconify/vue";
  import { useAuthStore } from "@/stores/useAuth";
  import { vOnClickOutside } from "@vueuse/components";
  import { RouterLink } from "vue-router";

  const auth = useAuthStore();

  const navUserDropdown = ref(false);

  const closeUserDropdown = () => {
    navUserDropdown.value = false;
  };
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
    <div class="relative" v-on-click-outside="closeUserDropdown">
      <div class="flex items-center justify-center gap-2">
        <img class="rounded-full w-6 h-6" src="@/assets/images/avatar.png" />
        <button
          @click="navUserDropdown = !navUserDropdown"
          class="flex items-center gap-1 capitalize"
        >
          {{ auth.user.first_name }} {{ auth.user.surname }}

          <Icon
            icon="tabler:chevron-down"
            class="transform duration-200"
            :class="navUserDropdown ? 'rotate-180' : ''"
          />
        </button>
      </div>

      <!-- Dropdown -->
      <div
        class="bg-white shadow rounded-2xl overflow-hidden absolute w-max min-w-full top-8 flex flex-col duration-200 transform origin-top-right"
        :class="navUserDropdown ? 'scale-100' : 'scale-0'"
      >
        <RouterLink
          :to="{ name: 'home' }"
          class="p-2 flex items-center justify-start gap-1 duration-200 hover:(bg-gray-200)"
        >
          <Icon icon="tabler:user" width="20" />
          Profile
        </RouterLink>
        <RouterLink
          :to="{ name: 'home' }"
          class="p-2 flex items-center justify-start gap-1 duration-200 hover:(bg-gray-200)"
        >
          <Icon icon="tabler:settings" width="20" />
          Settings
        </RouterLink>
        <button
          @click="auth.logout"
          class="bg-red-600 text-white font-bold p-2 flex items-center justify-start gap-1 duration-200 hover:(bg-red-500)"
        >
          <Icon icon="tabler:logout" />
          Logout
        </button>
      </div>
    </div>
  </div>
</template>
