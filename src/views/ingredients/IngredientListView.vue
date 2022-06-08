<template>
  <main class="container">
    <div class="flex flex-row my-5 justify-between items-center">
      <h1 class="text-underline text-4xl">Ingredients list</h1>
      <RouterLink
        to="/ingredient/add"
        class="rounded bg-green-400 shadow-sm py-2 px-5 duration-200 hover:(bg-green-300)"
      >
        New Ingredient
      </RouterLink>
    </div>
    <div v-for="ingredient in ingredients">
      <RouterLink :to="`/ingredient/${ingredient.id}/detail`">
        {{ ingredient }}
      </RouterLink>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const ingredients = ref({});

function fetchIngredients() {
  axios
    .get("ingredient/list/")
    .then((res) => (ingredients.value = res.data))
    .catch((err) => console.log(err));
}

onBeforeMount(() => {
  fetchIngredients();
});
</script>
