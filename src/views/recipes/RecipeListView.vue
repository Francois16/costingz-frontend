<script setup>
  import { ref, onBeforeMount } from "vue";
  import { Icon } from "@iconify/vue";
  import axios from "@/helpers/axios.js";

  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

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
  <DashboardHeading>
    <template v-slot:icon>
      <Icon icon="tabler:clipboard-list" />
    </template>
    <template v-slot:heading>Recipes</template>
    <template #button>
      <tippy content="Create New Recipe">
        <RouterLink
          :to="{ name: 'recipe-create' }"
          class="bg-primary p-2 flex rounded-full cursor-pointer"
        >
          <Icon icon="tabler:plus" />
        </RouterLink>
      </tippy>
    </template>
  </DashboardHeading>

  <table
    class="w-full whitespace-nowrap bg-white shadow-lg rounded overflow-hidden"
  >
    <thead class="bg-body text-white">
      <tr>
        <th class="text-left p-3 tracking-wide w-auto">Name</th>
        <th class="text-left p-3 tracking-wide w-auto">Yield</th>
        <th class="text-left p-3 tracking-wide w-auto">Cost</th>
        <th class="text-left p-3 tracking-wide w-auto">Cost/unit</th>
        <th class="text-left p-3 tracking-wide w-25">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="odd:(bg-light-600) duration-200 hover:(bg-light-700)"
        v-for="recipe in recipes"
      >
        <td class="px-3 py-2 capitalize">
          <RouterLink
            :to="{ name: 'recipe-detail', params: { id: recipe.id } }"
            class="text-primary underline-offset-4 duration-200 hover:(underline)"
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
              <Icon icon="tabler:trash" class="text-error" />
            </RouterLink>
          </tippy>
          <tippy content="Update Recipe">
            <RouterLink
              :to="{ name: 'recipe-update', params: { id: recipe.id } }"
              class="text-xl flex items-center p-2"
            >
              <Icon icon="tabler:edit" class="text-primary" />
            </RouterLink>
          </tippy>
        </td>
      </tr>
    </tbody>
  </table>
</template>
