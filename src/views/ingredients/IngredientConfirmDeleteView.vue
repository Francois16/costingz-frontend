<script setup>
import { Icon } from "@iconify/vue";
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import axios from "@/helpers/axios.js";

import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const recipes = ref({});
const ingredient = ref({});

async function getRelatedRecipes() {
  try {
    const id = route.params.id;
    const resp = await axios.get(`ingredient/${id}/confirm-delete/`, { id });

    recipes.value = resp.data;
  } catch (error) {}
}

async function getIngredientDetails() {
  try {
    const id = route.params.id;
    const resp = await axios.get(`ingredient/${id}/detail/`, { id });

    ingredient.value = resp.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteIngredient() {
  const id = route.params.id;

  try {
    const resp = await axios.delete(`ingredient/${id}/delete/`, { id });
    toast.success(`Successfully deleted ${ingredient.value.name}`);
    router.go(-1);
  } catch (error) {
    toast.error(
      "Oops something went wrong when trying to delete your ingredient."
    );
    console.log("deleteIngredient Error");
  }
}

onBeforeMount(() => {
  getRelatedRecipes();
  getIngredientDetails();
});
</script>

<template>
  <DashboardLayout>
    <template v-slot:content>
      <DashboardHeading>
        <template v-slot:icon>
          <Icon icon="typcn:times" class="text-red-500" />
        </template>
        <template v-slot:heading>
          Confirm Deletion of "{{ ingredient.name }}"
        </template>
      </DashboardHeading>

      <div class="flex flex-col gap-4">
        <div v-if="recipes.length">
          <div class="bg-red-200 p-6">
            <span class="block font-bold text-3xl text-red-600 mb-4"
              >Warning!</span
            >
            <div class="flex flex-col gap-4">
              <p>
                The ingredient
                <span class="font-bold">{{ ingredient.name }}</span> is used in
                the following recipes. If you delete this ingredient, we will
                also remove it from the recipes below.
              </p>
              <p>
                Your recipes will <strong>NOT</strong> be deleted, but the
                ingredient will be deleted and removed from the recipes below.
              </p>
            </div>
          </div>
          <div>
            <div
              class="border-b py-4 flex items-center gap-2"
              v-for="(recipe, index) in recipes"
            >
              <span>{{ index + 1 }}.</span>
              <RouterLink to="" class="underline">
                {{ recipe.name }}
              </RouterLink>
            </div>
          </div>
        </div>
        <div v-else>
          <p>no related recipes, safe to delete</p>
        </div>
        <button
          class="bg-red-700 border-2 border-red-700 text-white py-3 px-6 rounded shadow flex items-center justify-center gap-2 capitalize font-semibold self-end duration-200 hover:(bg-white text-red-700)"
          @click.prevent="deleteIngredient()"
        >
          Delete
        </button>
      </div>
    </template>
  </DashboardLayout>
</template>
