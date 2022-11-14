<script setup>
  import { ref, onBeforeMount } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import { Icon } from "@iconify/vue";
  import axios from "@/helpers/axios.js";
  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  const recipe = ref("");

  async function getRecipeDetails() {
    try {
      const resp = await axios.get(`recipe/${route.params.id}/detail/`);
      recipe.value = resp.data;
    } catch (error) {
      toast.error("Something went wrong while fetching recipe details");
    }
  }

  async function deleteRecipe() {
    try {
      const resp = await axios.delete(`/recipe/${route.params.id}/delete/`);
      toast.info(`Successfully deleted ${recipe.value.name}`);
      router.go(-1);
    } catch (error) {
      toast.error("Could not delete recipe");
    }
  }

  onBeforeMount(() => {
    getRecipeDetails();
  });
</script>

<template>
  <DashboardHeading>
    <template #icon> <Icon icon="typcn:times" class="text-error" /> </template>
    <template #heading>Delete {{ recipe.name }}</template>
  </DashboardHeading>

  <div class="flex flex-col gap-4">
    <p class="text-lg">
      Your recipe <strong class="lowercase">{{ recipe.name }}</strong> is not
      being used in any recipes and is safe to delete.
    </p>
    <button
      class="bg-red-700 border-2 border-red-700 text-white py-3 px-6 rounded shadow flex items-center justify-center gap-2 capitalize font-semibold self-end duration-200 hover:(bg-white text-red-700)"
      @click.prevent="deleteRecipe()"
    >
      <Icon icon="tabler:trash" class="text-lg" />
      Delete
    </button>
  </div>
</template>
