<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";

  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";
  import SearchBox from "@/components/ingredient/SearchBox.vue";

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();

  const recipe = ref({
    name: "",
    yield_count: "",
    yield_units: "",
    ingredients: [],
  });

  async function deleteRecipeIngredient(ID) {
    // Check if recipe ingredient already exists
    const index = recipe.value.ingredients.findIndex(
      (recipeIngredient) => recipeIngredient.id == ID
    );

    // If it does, send a delete request.
    if (recipe.value.ingredients[index].hasBeenCreated) {
      try {
        await axios.delete(`/recipe-ingredient/${ID}/delete/`);
      } catch (error) {
        toast.error("error occured deleteRecipeIngredient");
      }
    }

    // Remove the ingredient from the recipe ingredient list.
    recipe.value.ingredients.splice(index, 1);
  }

  async function updateRecipe() {
    const payload = buildPayload();

    try {
      const resp = await axios.patch(
        `/recipe/${route.params.id}/update/`,
        payload
      );

      toast.success("Successfully updated recipe");
      router.push({ name: "recipe-detail", params: { id: route.params.id } });
    } catch (error) {
      toast.error("Could not update recipe:");
      console.log(error);
    }
  }

  async function getRecipeDetails() {
    try {
      const resp = await axios.get(`/recipe/${route.params.id}/update/`);

      recipe.value = { ...resp.data };

      // Set the valid unit choices for each recipe ingredient.
      recipe.value.ingredients.forEach(async (ingredient, index, arr) => {
        const resp = await axios.get(
          `/recipe-ingredient/get-unit-choices/?ingredient_id=${ingredient.ingredient.id}`
        );

        arr[index].unitChoices = resp.data;
        arr[index].hasBeenCreated = true;
      });
    } catch (error) {
      toast.error("Could not find recipe details");
    }
  }

  function buildPayload() {
    // Builds the payload to be sent in the request to the server.
    let payload = {
      name: recipe.value.name,
      yield_count: recipe.value.yield_count,
      yield_units: recipe.value.yield_units,
      ingredients: [],
    };

    // Build the payload for each recipe ingredient.
    recipe.value.ingredients.forEach((recipeIngredient, index, arr) => {
      let ingredient_schema = {
        id: recipeIngredient.id,
        ingredient: recipeIngredient.ingredient.id,
        magnitude: recipeIngredient.magnitude,
        unit: recipeIngredient.unit,
      };

      payload.ingredients.push(ingredient_schema);
    });

    return payload;
  }

  async function addIngredientToRecipe(ingredient) {
    const recipeIngredient = {
      // Set the recipe ingredient id to -1 (ID does not exist in database) so that a new recipe ingredient can be created.
      id: -1,
      ingredient: ingredient,
      unitChoices: [],
      magnitude: "",
      unit: "",
      // This means that the recipe ingredient does not exist in the database yet.
      hasBeenCreated: false,
    };

    const resp = await axios.get(
      `/recipe-ingredient/get-unit-choices/?ingredient_id=${ingredient.id}`
    );

    recipeIngredient.unitChoices = resp.data;
    recipe.value.ingredients.push(recipeIngredient);
  }

  onMounted(() => {
    getRecipeDetails();
  });
</script>

<template>
  <DashboardHeading>
    <template #icon><Icon icon="tabler:clipboard-list" /></template>
    <template #heading>Update [recipe name]</template>
  </DashboardHeading>

  <div class="bg-white shadow-2xl p-6 max-w-2xl">
    <h3 class="text-2xl mb-5 border-b pb-5 text-muted uppercase">
      Recipe Details
    </h3>

    <form @submit.prevent="updateRecipe" class="max-w-xl flex flex-col gap-2">
      <div class="flex flex-col">
        <label for="name">Name</label>
        <input v-model="recipe.name" type="text" name="name" />
        <span class="text-muted text-xs my-1">
          Enter the name of your new recipe
        </span>
      </div>
      <div class="flex flex-col">
        <label for="yield_count">Yield Count</label>
        <input v-model="recipe.yield_count" type="text" name="yield_count" />
        <span class="text-muted text-xs my-1">
          Enter the number of portions you will produce
        </span>
      </div>
      <div class="flex flex-col">
        <label for="yield_units">Yield Units</label>
        <input v-model="recipe.yield_units" type="text" name="yield_units" />
        <span class="text-muted text-xs my-1">
          Enter the unit of serving eg. 'slices'
        </span>
      </div>

      <div class="mt-5">
        <p class="text-2xl block mb-5 border-b pb-5 text-muted uppercase">
          Recipe Ingredients
        </p>
        <span
          class="block mb-5 text-sm text-muted text-center"
          v-if="recipe.ingredients.length == 0"
        >
          No ingredients added yet, try searching for one below and add it to
          the recipe
        </span>
        <ul v-auto-animate v-else class="flex flex-col gap-3 mb-5">
          <li
            v-for="(recipeIngredient, index) in recipe.ingredients"
            :key="index"
          >
            <p class="font-bold mt-2 capitalize">
              {{ recipeIngredient.ingredient.name }}
            </p>
            <div class="flex gap-1">
              <input
                v-model="recipeIngredient.magnitude"
                :name="`ingredient.${index}.magnitude`"
                type="text"
                placeholder="Amount"
              />
              <select
                v-model="recipeIngredient.unit"
                :name="`ingredient.${index}.unit`"
              >
                <option value="" disabled hidden selected>
                  --- Select Unit ---
                </option>
                <optgroup
                  v-for="(units, key) in recipeIngredient.unitChoices"
                  :label="key"
                >
                  <option v-for="unit in units" :value="unit[0]">
                    {{ unit[1] }}
                  </option>
                </optgroup>
              </select>

              <tippy content="Remove ingredient">
                <button
                  class="p-2 text-red-400 text-2xl h-full"
                  @click.prevent="deleteRecipeIngredient(recipeIngredient.id)"
                >
                  <Icon icon="tabler:trash" />
                </button>
              </tippy>
            </div>
          </li>
        </ul>
      </div>

      <SearchBox @clicked="addIngredientToRecipe" />

      <button
        type="submit"
        class="bg-white border-2 border-emerald-600 text-emerald-600 self-end py-2 px-10 font-bold duration-200 hover:(bg-emerald-600 text-white)"
      >
        Update
      </button>
    </form>
  </div>
</template>
