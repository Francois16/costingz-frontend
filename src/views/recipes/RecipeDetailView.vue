<script setup>
  import { ref, onBeforeMount } from "vue";
  import { useRoute, RouterLink } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";

  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

  const route = useRoute();
  const toast = useToast();
  const recipe = ref({});

  async function getRecipeDetails() {
    try {
      const resp = await axios.get(`/recipe/${route.params.id}/detail/`);

      recipe.value = resp.data;
    } catch (error) {
      toast.error("cant fetch recipe");
    }
  }

  onBeforeMount(() => {
    getRecipeDetails();
  });
</script>

<template>
  <DashboardHeading>
    <template #icon>
      <Icon icon="tabler:clipboard-list" />
    </template>
    <template #heading>{{ recipe.name }}</template>
    <template #button>
      <tippy content="Edit Recipe">
        <RouterLink
          v-if="recipe.id"
          :to="{ name: 'recipe-update', params: { id: recipe.id } }"
          class="bg-primary p-2 flex rounded-full"
        >
          <Icon icon="tabler:edit" />
        </RouterLink>
      </tippy>
    </template>
  </DashboardHeading>

  <section class="grid md:(grid-cols-2) gap-6">
    <div class="bg-white rounded-2xl shadow">
      <h6 class="text-2xl font-bold p-4 underline underline-offset-8">
        Yield & Cost
      </h6>
      <ul class="divide-y">
        <li
          class="flex flex-col sm:(flex-row) justify-between items-center p-3"
        >
          <span>Total Recipe Cost</span>
          <span class="bg-primary rounded-full px-5 font-bold">
            R{{ recipe.total_cost }}
          </span>
        </li>
        <li class="flex justify-between items-center p-4">
          <span>Cost per {{ recipe.yield_units }}</span>
          <span class="bg-primary rounded-full px-5 font-bold">
            R{{ recipe.unit_cost }}
          </span>
        </li>

        <li class="flex justify-between items-center p-4">
          <span>Yield Amount</span>
          <span class="bg-primary rounded-full px-5 font-bold">
            {{ recipe.yield_count }}
          </span>
        </li>
        <li class="flex justify-between items-center p-4">
          <span>Yield Units</span>
          <span class="bg-primary rounded-full px-5 font-bold">
            {{ recipe.yield_units }}
          </span>
        </li>
      </ul>
    </div>
    <div>
      <h6>Categories</h6>
      <p>Not Implemented on the backend yet.</p>
    </div>
    <h6 class="text-2xl font-bold col-span-2 underline underline-offset-8 mt-4">
      Cost Breakdown
    </h6>
    <section class="grid grid-col-1 col-span-2 bg-white shadow">
      <table>
        <thead>
          <tr class="border-b-2 border-body">
            <th class="text-left p-3">Item</th>
            <th class="text-left p-3">Quantity (Gross)</th>
            <th class="text-left p-3">Item Cost</th>
            <th class="text-left p-3">Cost Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr class="odd:(bg-grey)" v-for="ingredient in recipe.ingredients">
            <td class="p-3">{{ ingredient.ingredient }}</td>
            <td class="p-3">
              {{ ingredient.magnitude }} {{ ingredient.unit }}
            </td>
            <td class="p-3">R{{ ingredient.cost.toFixed(2) }}</td>
            <td class="p-3">{{ ingredient.percentage_cost.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<style></style>
