<template>
  <main class="container mt-5">
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col mx-auto max-w-md gap-y-3"
    >
      <h1 class="text-3xl">Add new ingredient</h1>

      <input
        class="border rounded py-0.5 px-2"
        type="text"
        placeholder="name"
        v-model="ingredientFormData.name"
        required
      />
      <input
        class="border rounded py-0.5 px-2"
        type="text"
        placeholder="price"
        v-model="ingredientFormData.price"
        required
      />
      <input
        class="border rounded py-0.5 px-2"
        type="text"
        placeholder="magnitude"
        v-model="ingredientFormData.magnitude"
        required
      />
      <select
        class="border rounded py-1.5 px-2"
        name="unit"
        id="unit"
        v-model="ingredientFormData.unit"
        required
      >
        <option class="hidden" value="">-- Select Unit --</option>
        <optgroup v-for="(choices, group) in choices" :label="group">
          <option v-for="choice in choices" :value="choice">
            {{ choice }}
          </option>
        </optgroup>
      </select>

      <button
        class="rounded bg-green-400 py-1 px-3 duration-200 hover:(bg-green-300)"
      >
        Submit
      </button>
      <p>{{ ingredientFormData }}</p>
    </form>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref, onBeforeMount } from "vue";

const choices = ref();
const ingredientFormData = ref({
  name: "",
  price: "",
  magnitude: "",
  unit: "",
});

function handleSubmit() {
  axios
    .post("ingredient/create/", ingredientFormData.value)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

onBeforeMount(() => {
  axios
    .get("ingredient/create/")
    .then((res) => {
      choices.value = JSON.parse(res.data);
    })
    .catch((err) => console.log(err));
});
</script>
