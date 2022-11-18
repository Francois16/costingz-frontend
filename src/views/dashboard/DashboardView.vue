<script setup>
  import { Icon } from "@iconify/vue";
  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";
</script>

<template>
  <DashboardHeading>
    <template #icon>
      <Icon icon="tabler:layout-dashboard" />
    </template>
    <template #heading>Dashboard Summary</template>
  </DashboardHeading>

  <section class="grid grid-cols-2 gap-5 children:(p-3 border)">
    <div class="bg-white">Ingredients</div>
    <div class="bg-white">Recipes</div>
  </section>
</template>

<style scoped></style>
