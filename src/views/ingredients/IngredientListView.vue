<script setup>
import { ref, onBeforeMount } from "vue";
import Navbar from "@/components/ui/navbar.vue";
import axios from "@/helpers/axios.js";

const ingredients = ref();
const loading = ref(true);

async function getIngredients() {
  try {
    const resp = await axios.get("/ingredient/list/");
    ingredients.value = resp.data;
    loading.value = false;
  } catch (error) {
    console.log("IngredientListVue error");
  }
}

onBeforeMount(() => {
  getIngredients();
});
</script>

<template>
  <Navbar />
  <main class="container">
    <ul v-if="!loading">
      <li v-for="ingredient in ingredients">
        {{ ingredient }}
      </li>
    </ul>

    <p v-if="loading" class="text-3xl text-center">Loading...</p>
  </main>
</template>
