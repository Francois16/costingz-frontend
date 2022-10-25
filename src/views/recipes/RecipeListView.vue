<script setup>
import { ref, onBeforeMount } from "vue";
import Navbar from "@/components/ui/Navbar.vue";
import axios from "@/helpers/axios.js";

const loading = ref(true);
const recipes = ref();

async function getRecipes() {
  try {
    const resp = await axios.get("/recipe/list/");
    recipes.value = resp.data;
    loading.value = false;
  } catch (error) {
    console.log("recipe error", error);
  }
}

onBeforeMount(() => {
  getRecipes();
});
</script>

<template>
  <Navbar />
  <main class="container">
    <p v-if="loading" class="text-3xl text-center mt-5">Loading...</p>

    <ul v-if="!loading">
      <li v-for="recipe in recipes">{{ recipe }}</li>
    </ul>
  </main>
</template>
