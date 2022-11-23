<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { useToast } from "vue-toastification";

  import axios from "@/helpers/axios.js";

  import DashboardHeadingVue from "@/components/ui/text/DashboardHeading.vue";
  import SearchBox from "@/components/ingredient/SearchBox.vue";

  const toast = useToast();
  const router = useRouter();

  const recipe = ref({
    name: "",
    yield_count: "",
    yield_units: "",
    ingredients: [],
  });

  function buildPayload() {
    // build payload structure as required by API.
    let payload = {
      name: recipe.value.name,
      yield_count: recipe.value.yield_count,
      yield_units: recipe.value.yield_units,
      ingredients: [],
    };

    recipe.value.ingredients.forEach((ingredient, index) => {
      let ingredient_schema = {
        ingredient: ingredient.id,
        magnitude: ingredient.magnitude,
        unit: ingredient.unit,
      };

      payload.ingredients.push(ingredient_schema);
    });

    return payload;
  }

  async function createRecipe() {
    // Build payload here
    const payload = buildPayload();

    try {
      // send payload to server
      const resp = await axios.post("/recipe/create/", payload);

      toast.success("Successfully created your recipe!");
      router.push({ name: "recipe-detail", params: { id: resp.data.id } });
    } catch (error) {
      toast.error("Could not create recipe.");
    }
  }

  async function addIngredientToRecipe(ingredient) {
    const resp = await axios.get(
      `/recipe-ingredient/get-unit-choices/?ingredient_id=${ingredient.id}`
    );

    ingredient.unitChoices = resp.data;
    ingredient.magnitude = "";
    ingredient.unit = "";
    recipe.value.ingredients.push(ingredient);
  }

  function removeIngredient(index) {
    recipe.value.ingredients.splice(index, 1);
  }
</script>

<template>
  <DashboardHeadingVue>
    <template #icon>
      <Icon icon="tabler:clipboard-list" />
    </template>
    <template #heading>Create new recipe</template>
  </DashboardHeadingVue>
  <div class="bg-white shadow-2xl p-6 max-w-2xl">
    <h3 class="text-2xl mb-5 border-b pb-5 text-muted uppercase">
      Recipe Details
    </h3>

    <form @submit.prevent="createRecipe" class="max-w-xl flex flex-col gap-2">
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
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <p class="font-bold mt-2">{{ ingredient.name }}</p>
            <div class="flex gap-1">
              <input
                v-model="ingredient.magnitude"
                :name="`ingredient.${index}.magnitude`"
                type="text"
                placeholder="Amount"
              />
              <select
                v-model="ingredient.unit"
                :name="`ingredient.${index}.unit`"
              >
                <option value="" disabled hidden selected>
                  --- Select Unit ---
                </option>
                <optgroup
                  v-for="(units, key) in ingredient.unitChoices"
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
                  @click.prevent="removeIngredient(index)"
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
        Save
      </button>
    </form>
  </div>
</template>

<style></style>
