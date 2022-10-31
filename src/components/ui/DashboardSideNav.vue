<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="min-h-screen w-64 bg-transparent"></div>
  <div
    class="min-h-screen bg-white border-r p-6 absolute w-64 top-0 left-0 flex flex-col"
  >
    <RouterLink to="/dashboard" class="text-2xl font-semibold uppercase">
      Costingz
    </RouterLink>
    <RouterLink to="/dashboard/ingredients/list">Ingredients</RouterLink>
    <RouterLink to="/dashboard/recipes/list">Recipes</RouterLink>
  </div>
</template>
