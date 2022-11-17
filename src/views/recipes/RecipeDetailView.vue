<script setup>
  import { ref, onBeforeMount, onMounted } from "vue";
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
      setPercentCostChart();
    } catch (error) {
      toast.error("cant fetch recipe");
    }
  }

  function setPercentCostChart() {
    const labels = recipe.value.ingredients.map(
      (ingredient) => ingredient.ingredient
    );
    const data = recipe.value.ingredients.map(
      (ingredient) => ingredient.percentage_cost
    );

    const ctx = document.getElementById("percentageCostChart");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "% cost: ",
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Percentage Cost per Ingredient",
            font: {
              size: 16,
            },
          },
        },
      },
    });
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

  <!-- <pre>{{ recipe.ingredients }}</pre> -->

  <section class="grid md:(grid-cols-3) gap-6">
    <div class="bg-white shadow-2xl col-span-1">
      <h6 class="text-2xl font-bold p-3">Yield & Cost</h6>
      <ul class="divide-y">
        <li
          class="flex flex-col sm:(flex-row) justify-between items-center py-2 px-3"
        >
          <span>Total Recipe Cost</span>
          <span class="px-4" v-if="Object.keys(recipe).length">
            R{{ recipe.total_cost.toFixed(2) }}
          </span>
        </li>
        <li class="flex justify-between items-center py-2 px-3">
          <span>Cost per {{ recipe.yield_units }}</span>
          <span class="px-4" v-if="Object.keys(recipe).length">
            R{{ recipe.unit_cost.toFixed(2) }}
          </span>
        </li>

        <li class="flex justify-between items-center py-2 px-3">
          <span>Yield Amount</span>
          <span class="px-4">
            {{ recipe.yield_count }}
          </span>
        </li>
        <li class="flex justify-between items-center py-2 px-3">
          <span>Yield Units</span>
          <span class="px-4">
            {{ recipe.yield_units }}
          </span>
        </li>
      </ul>
    </div>

    <div class="col-span-1">
      <canvas id="percentageCostChart"></canvas>
    </div>

    <!-- <h6 class="text-2xl font-bold col-span-2 underline underline-offset-8 mt-4">
      Cost Breakdown
    </h6> -->

    <section class="grid grid-col-1 col-span-full bg-white shadow-2xl">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity (Gross)</th>
            <th>Item Cost</th>
            <th>Cost Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in recipe.ingredients">
            <td>{{ ingredient.ingredient }}</td>
            <td>{{ ingredient.magnitude }} {{ ingredient.unit }}</td>
            <td>R{{ ingredient.cost.toFixed(2) }}</td>
            <td>{{ ingredient.percentage_cost.toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </section>
  </section>
</template>

<style>
  thead > tr {
    @apply border-b-2 border-body;
  }

  tbody > tr {
    @apply odd:(bg-grey);
  }

  th,
  td {
    @apply text-left p-3;
  }
</style>
