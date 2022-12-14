<script setup>
  import { ref } from "vue";
  import { Icon } from "@iconify/vue";
  import { useRoute } from "vue-router";
  import axios from "@/helpers/axios.js";

  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";
  import IngredientUpdateForm from "@/components/ingredient/IngredientUpdateForm.vue";
  import BasicFormSkeleton from "@/components/skeletons/forms/BasicFormSkeleton.vue";

  const route = useRoute();
  const ingredientName = ref("");

  const fetchIngredientName = async () => {
    try {
      const resp = await axios.get(`/ingredient/${route.params.id}/detail/`);
      ingredientName.value = resp.data.name;
    } catch (error) {
      console.log(error);
    }
  };

  fetchIngredientName();
</script>

<template>
  <DashboardHeading>
    <template #icon>
      <Icon icon="tabler:apple" />
    </template>
    <template #heading> Update {{ ingredientName }} </template>
  </DashboardHeading>

  <Suspense>
    <template #default>
      <IngredientUpdateForm />
    </template>
    <template #fallback>
      <BasicFormSkeleton />
    </template>
  </Suspense>
</template>

<style></style>
