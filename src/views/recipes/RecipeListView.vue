<script setup>
  import DashboardLayoutVue from "@/components/layouts/DashboardLayout.vue";
  import DashboardHeadingVue from "@/components/ui/text/DashboardHeading.vue";
  import { Icon } from "@iconify/vue";

  import { ref, onBeforeMount } from "vue";
  import axios from "@/helpers/axios.js";
  import { RouterLink } from "vue-router";

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
        <template #button>
          <tippy content="Create New Recipe">
            <RouterLink
              :to="'/dashboard'"
              class="bg-primary p-2 flex rounded-full cursor-pointer"
            >
              <Icon icon="tabler:plus" />
            </RouterLink>
          </tippy>
        </template>
      </DashboardHeadingVue>

      <table class="w-full bg-white shadow-lg rounded overflow-hidden">
        <thead class="bg-body text-white">
          <tr>
            <th class="text-left p-3">Name</th>
            <th class="text-left p-3">Yield</th>
            <th class="text-left p-3">Cost</th>
            <th class="text-left p-3">Cost/unit</th>
            <th class="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="odd:(bg-light-600)" v-for="recipe in recipes">
            <td class="px-3 py-2 capitalize">
              <RouterLink
                :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
                class="text-blue-600 underline-offset-4 duration-200 hover:(underline)"
              >
                {{ recipe.name }}
              </RouterLink>
            </td>
            <td class="px-3 py-2 capitalize">
              {{ recipe.yield_count }} {{ recipe.yield_units }}
            </td>
            <td class="px-3 py-2 capitalize">
              R {{ recipe.total_cost.toFixed(2) }}
            </td>
            <td class="px-3 py-2 capitalize">
              R {{ recipe.unit_cost.toFixed(2) }} / {{ recipe.yield_units }}
            </td>
            <td class="px-3 py-2 flex gap-1 items-center">
              <tippy content="Delete Recipe">
                <RouterLink
                  :to="{ name: 'recipe-delete', params: { id: recipe.id } }"
                  class="text-xl flex items-center p-2"
                >
                  <Icon icon="tabler:trash" class="text-red-500" />
                </RouterLink>
              </tippy>
              <tippy content="Update Recipe">update </tippy>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </DashboardLayoutVue>
</template>
