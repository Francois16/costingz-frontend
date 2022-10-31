<script setup>
import DashboardLayoutVue from "@/components/layouts/DashboardLayout.vue";
import DashboardHeadingVue from "@/components/ui/text/DashboardHeading.vue";
import { Icon } from "@iconify/vue";

import { ref, onBeforeMount } from "vue";
import axios from "@/helpers/axios.js";

const recipes = ref();

async function getRecipes() {
  try {
    const resp = await axios.get("/recipe/list/");
    recipes.value = resp.data;
  } catch (error) {
    console.log("recipe error", error);
  }
}

onBeforeMount(() => {
  getRecipes();
});
</script>

<template>
  <DashboardLayoutVue>
    <template v-slot:content>
      <DashboardHeadingVue>
        <template v-slot:icon>
          <Icon icon="tabler:clipboard-list" />
        </template>
        <template v-slot:heading>Recipes</template>
      </DashboardHeadingVue>
      <ul>
        <li v-for="recipe in recipes">{{ recipe }}</li>
      </ul>
    </template>
  </DashboardLayoutVue>
</template>
