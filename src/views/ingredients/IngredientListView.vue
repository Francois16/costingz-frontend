<template>
  <main class="container">
    <h1 class="text-4xl text-underline">Ingredients list</h1>
    <div v-for="ingredient in ingredients">
      <h1>{{ ingredient }}</h1>
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
