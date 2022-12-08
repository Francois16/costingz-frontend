<script setup>
  import { Icon } from "@iconify/vue";

  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";
  import IngredientCreateForm from "@/components/ingredient/IngredientCreateForm.vue";
  import BasicFormSkeleton from "@/components/skeletons/forms/BasicFormSkeleton.vue";
</script>

<template>
  <DashboardHeading>
    <template v-slot:icon>
      <Icon icon="tabler:apple" />
    </template>
    <template v-slot:heading> Create new Ingredient </template>
  </DashboardHeading>

  <Suspense>
    <template #default>
      <IngredientCreateForm />
    </template>
    <template #fallback>
      <BasicFormSkeleton />
    </template>
  </Suspense>
</template>
