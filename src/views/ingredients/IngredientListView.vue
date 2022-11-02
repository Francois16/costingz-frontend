<script setup>
  import { Icon } from "@iconify/vue";

  import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

  import { ref, onBeforeMount } from "vue";

  import axios from "@/helpers/axios.js";
  import { RouterLink } from "vue-router";

  const ingredients = ref({});

  async function getIngredients() {
    try {
      const resp = await axios.get("/ingredient/list/");
      ingredients.value = resp.data;
    } catch (error) {
      console.log("IngredientListVue error");
    }
  }

  function addIngredient() {
    isOpen = true;
  }

  function updateIngredient(id) {
    alert(`Updating ingredient with id: ${id}`);
  }

  onBeforeMount(() => {
    getIngredients();
  });
</script>

<template>
  <!-- Main -->
  <DashboardLayout>
    <template v-slot:content>
      <DashboardHeading>
        <template v-slot:icon>
          <Icon icon="tabler:apple" />
        </template>
        <template v-slot:heading>Ingredients</template>
        <template v-slot:button>
          <RouterLink
            to="/dashboard/ingredient/add"
            class="bg-primary flex p-2 rounded-full cursor-pointer"
          >
            <Icon icon="tabler:plus" />
          </RouterLink>
        </template>
      </DashboardHeading>

      <table class="w-full bg-white shadow-lg rounded overflow-hidden">
        <thead class="bg-body text-white">
          <tr>
            <th class="text-left p-3">Name ({{ ingredients.length }} items)</th>
            <th class="text-left p-3">Purchase Amount</th>
            <th class="text-left p-3">Purchase Price</th>
            <th class="text-left p-3">Price/Unit</th>
            <th class="text-left p-3">Actions</th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            class="odd:(bg-light-600)"
            v-for="ingredient in ingredients"
          >
            <td class="px-3 py-2 capitalize">
              {{ ingredient.name }}
            </td>
            <td class="px-3 py-2">
              {{ ingredient.magnitude }} {{ ingredient.short_unit }}
            </td>
            <td class="px-3 py-2">R{{ ingredient.price }}</td>
            <td class="px-3 py-2">
              R{{ ingredient.price_per_unit.toFixed(2) }}/{{
                ingredient.short_unit
              }}
            </td>
            <td class="px-3 py-2 flex gap-1 items-center">
              <RouterLink
                :to="`/dashboard/ingredient/${ingredient.id}/confirm-delete`"
                class="text-xl flex items-center p-2"
              >
                <Icon
                  icon="tabler:trash"
                  class="text-red-500"
                />
              </RouterLink>
              <button
                class="text-xl flex items-center p-2"
                @click.prevent="updateIngredient(ingredient.id)"
              >
                <Icon
                  icon="tabler:edit"
                  class="text-primary"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </DashboardLayout>
</template>
