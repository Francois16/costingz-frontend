<script setup>
  import { ref } from "vue";
  import { useToast } from "vue-toastification";
  import { useRoute, useRouter } from "vue-router";
  import axios from "@/helpers/axios.js";

  import BaseInput from "@/components/ui/forms/BaseInput.vue";
  import BaseSelect from "@/components/ui/forms/BaseSelect.vue";
  import BaseListBox from "@/components/ui/dropdowns/BaseListBox.vue";
  import Button from "@/components/ui/buttons/Button.vue";

  const toast = useToast();
  const route = useRoute();
  const router = useRouter();

  const unitChoices = ref();
  const ingredientName = ref("");
  const ingredient = ref("");
  const categories = ref("");

  const fetchIngredientDetails = async () => {
    try {
      const resp = await axios.get(`/ingredient/${route.params.id}/detail/`);
      delete resp.data.id;
      ingredientName.value = resp.data.name;
      ingredient.value = { ...resp.data };
    } catch (error) {
      toast.error("Something went wrong trying to fetch ingredient details");
    }
  };

  const fetchUnitChoices = async () => {
    try {
      const resp = await axios.get(
        `/ingredient/get-valid-update-units/?ingredient_id=${route.params.id}`
      );
      unitChoices.value = resp.data;
    } catch (error) {
      console.log(error);
      toast.error("Could not fetch unit choices");
    }
  };

  const fetchCategories = async () => {
    try {
      const resp = await axios.get("/ingredient/categories/");

      // Change options keys so that it can be passed to the component
      resp.data.forEach((category) => {
        category["label"] = category["name"];
        delete category["name"];

        category["value"] = category["id"];
        delete category["id"];
      });

      categories.value = resp.data;

      //   Set value of category
      ingredient.value.category = resp.data.find(
        (category) => category.label == ingredient.value.category
      ).value;
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    try {
      await axios.patch(`/ingredient/${route.params.id}/update/`, {
        ...ingredient.value,
      });

      toast.success("Successfully update ingredient");
      router.go(-1);
    } catch (error) {
      toast.error("Could not submit update ingredient form`");
    }
  };

  await fetchIngredientDetails();
  await fetchUnitChoices();
  await fetchCategories();
</script>

<template>
  <form
    @submit.prevent="submit"
    class="bg-white flex flex-col max-w-2xl p-10 shadow-2xl gap-5"
  >
    <BaseInput
      label="Name"
      v-model="ingredient.name"
      type="text"
      helpText="The name of your ingredient"
      required
    />

    <BaseInput
      label="Price"
      icon="R"
      v-model="ingredient.price"
      type="text"
      helpText="The price you paid for the item"
      required
    />

    <div class="grid grid-cols-2 gap-6">
      <BaseInput
        label="Magnitude"
        v-model="ingredient.magnitude"
        helpText="The size/weight per item"
        type="text"
        required
      />
      <BaseSelect
        label="Unit"
        v-model="ingredient.unit"
        :options="unitChoices"
        helpText="Unit you purchased the item in"
        required
      />
    </div>

    <BaseListBox
      label="Category"
      v-model="ingredient.category"
      helpText="Category for your ingredient"
      :options="categories"
    />

    <Button type="submit" text="Update" />
  </form>
</template>
