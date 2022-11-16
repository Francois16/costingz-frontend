<script setup>
  import { ref } from "vue";
  import { useToast } from "vue-toastification";
  import { Icon } from "@iconify/vue";
  import axios from "@/helpers/axios.js";

  const searchBox = ref(null);
  const results = ref("");
  const displayResults = ref(false);
  const query = ref("");

  const toast = useToast();

  async function searchIngredients() {
    try {
      const resp = await axios.get(`/ingredient/search?q=${query.value}`);

      results.value = { ...resp.data };
    } catch (error) {
      toast.error("something went wrong searching for ingredients");
    }
  }

  function resetSearchBox() {
    query.value = "";
    displayResults.value = false;
  }

  function hideResults() {
    let timeout = 50;

    setTimeout(() => {
      displayResults.value = false;
    }, timeout);
  }
</script>

<template>
  <div class="flex flex-col">
    <!-- input -->
    <label for="ingredients">Add ingredient</label>
    <div class="relative">
      <input
        ref="searchBox"
        type="search"
        placeholder="Search ingredient"
        v-model="query"
        @focus="(displayResults = true), searchIngredients()"
        @focusout="hideResults"
        @keyup="searchIngredients"
      />

      <!-- Results -->
      <Transition name="fade">
        <ul
          v-if="displayResults && Object.keys(results).length"
          class="absolute bottom-full mb-1 inset-x-0 bg-white border shadow-2xl max-h-48 overflow-y-scroll"
        >
          <li v-for="ingredient in results">
            <button
              @click.prevent="$emit('clicked', ingredient), resetSearchBox()"
              class="w-full capitalize text-left p-2 hover:(bg-primary) duration-200 flex items-center gap-1"
            >
              <Icon icon="tabler:apple" />
              {{ ingredient.name }}
            </button>
          </li>
        </ul>
        <span
          v-else-if="displayResults && !Object.keys(results).length"
          class="absolute bottom-full mb-1 inset-x-0 p-6 text-center bg-white border shadow-2xl max-h-48"
        >
          No ingredients or recipes matching your search criteria
        </span>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .fade-enter-active {
    transition: all 0.5s ease;
  }

  .fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(25px);
    opacity: 0;
  }
</style>
