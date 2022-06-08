<template>
  <main class="container">
    <h1 class="text-3xl">Ingredient Detail View</h1>
    <div>
      {{ ingredient }}
    </div>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import axios from "axios";

const route = useRoute();
const ingredientID = route.params.id;
const ingredient = ref({});

onBeforeMount(() => {
  axios
    .get(`ingredient/${ingredientID}/detail`)
    .then((res) => {
      ingredient.value = res.data;
    })
    .catch((err) => console.log(err));
});
</script>
