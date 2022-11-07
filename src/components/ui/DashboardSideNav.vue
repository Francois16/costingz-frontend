<script setup>
  import { ref } from "vue";
  import { RouterLink } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { vOnClickOutside } from "@vueuse/components";

  const navOpen = ref(false);

  const closeNav = () => {
    navOpen.value = false;
  };
</script>

<template>
  <div class="bg-transparent min-h-screen w-20 lg:(w-64)"></div>
  <div
    class="bg-white flex flex-col rounded-2xl shadow inset-y-5 left-5 gap-1 duration-200 fixed"
    :class="navOpen ? 'w-64 p-6' : 'w-14 px-2 py-4'"
    v-on-click-outside="closeNav"
  >
    <div
      class="flex delay-200 items-center justify-between"
      :class="navOpen ? 'flex-row' : 'flex-col gap-2'"
    >
      <RouterLink
        to="/dashboard"
        class="rounded flex font-display font-bold bg-blue-400 h-8 text-white text-center w-8 items-center justify-center"
      >
        C
      </RouterLink>
      <tippy :content="navOpen ? 'Close Menu' : 'Open Menu'">
        <div
          class="rounded cursor-pointer bg-gray-200 p-1 duration-200 hover:(bg-gray-300)"
          @click="navOpen = !navOpen"
        >
          <Icon :icon="navOpen ? 'tabler:arrow-left' : 'tabler:arrow-right'" />
        </div>
      </tippy>
    </div>
    <hr class="my-3" />

    <h3 v-show="navOpen" class="menu-heading">Menu</h3>

    <tippy :content="navOpen ? '' : 'Dashboard'">
      <RouterLink
        :to="{ name: 'dashboard' }"
        class="rounded-lg cursor-pointer flex font-bold text-sm py-2 px-2 gap-1 items-center capitalize hover:(bg-gray-200)"
      >
        <Icon icon="tabler:layout-dashboard" class="side-nav-icon" />
        <span v-show="navOpen">Dashboard</span>
      </RouterLink>
    </tippy>
    <tippy :content="navOpen ? '' : 'Ingredient'">
      <RouterLink
        :to="{ name: 'ingredient-list' }"
        class="rounded-lg cursor-pointer flex font-bold text-sm py-2 px-2 gap-1 items-center capitalize hover:(bg-gray-200)"
      >
        <Icon icon="tabler:apple" class="side-nav-icon" />
        <span v-show="navOpen"> Ingredients </span>
      </RouterLink>
    </tippy>
    <tippy :content="navOpen ? '' : 'Recipes'">
      <RouterLink
        :to="{ name: 'recipe-list' }"
        class="rounded-lg cursor-pointer flex font-bold text-sm py-2 px-2 gap-1 items-center capitalize hover:(bg-gray-200)"
      >
        <Icon icon="tabler:clipboard-list" class="side-nav-icon" />
        <span v-show="navOpen"> Recipes </span>
      </RouterLink>
    </tippy>
  </div>
</template>

<style scoped>
  .side-nav-icon {
    @apply h-5 w-5;
  }

  .menu-heading {
    @apply font-bold text-sm text-muted;
  }
</style>
