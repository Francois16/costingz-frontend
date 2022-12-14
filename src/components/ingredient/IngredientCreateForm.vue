<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";

  import BaseInput from "@/components/ui/forms/BaseInput.vue";
  import BaseSelect from "@/components/ui/forms/BaseSelect.vue";
  import BaseListBox from "@/components/ui/dropdowns/BaseListBox.vue";
  import Button from "@/components/ui/buttons/Button.vue";

  const formData = ref({
    name: "",
    price: "",
    magnitude: "",
    category: "",
    unit: "",
  });
  const categories = ref([]);
  const units = ref([]);

  const router = useRouter();
  const toast = useToast();

  const submit = async () => {
    try {
      await axios.post("/ingredient/create/", { ...formData.value });
      toast.success(`Successfully created ${formData.value.name}`);
      router.go(-1);
    } catch (error) {
      toast.error("Could not submit your forms.");
    }
  };

  const fetchUnitChoices = async () => {
    try {
      const resp = await axios.get("/ingredient/get-all-unit-choices/");
      units.value = resp.data;
    } catch (error) {
      toast.error("Something went wrong while trying to fetch unit choices");
    }
  };

  const fetchCategories = async () => {
    try {
      const resp = await axios.get("/ingredient/categories/");

      // Change options keys so that it can be passed to the component
      resp.data.forEach((category) => {
        category.label = category.name;
        delete category.name;

        category.value = category.id;
        delete category.id;
      });

      console.log(resp.data);

      categories.value = resp.data;

      // Set the default value of category
      formData.value.category = resp.data.find(
        (category) => category.label == "Uncategorized"
      ).value;
    } catch (error) {
      console.log(error);
    }
  };

  await fetchCategories();
  await fetchUnitChoices();
</script>

<template>
  <form
    @submit.prevent="submit"
    class="flex flex-col gap-4 bg-white p-10 rounded shadow-2xl max-w-2xl"
  >
    <BaseInput
      v-model="formData.name"
      label="Name"
      helpText="The name of your ingredient"
      name="name"
      required
    />
    <BaseInput
      v-model="formData.price"
      label="Price"
      helpText="The price you paid"
      name="price"
      icon="R"
      required
    />

    <div class="grid grid-cols-2 gap-3">
      <BaseInput
        v-model="formData.magnitude"
        label="Magnitude"
        helpText="The purchase size/weight "
        name="magnitude"
        required
      />

      <BaseSelect
        label="Unit"
        :options="units"
        v-model="formData.unit"
        helpText="The unit you bought it in"
        name="Unit"
        required
      />
    </div>

    <BaseListBox
      v-model="formData.category"
      label="Category"
      helpText="Select a category for your ingredient"
      :options="categories"
    />

    <Button text="Create" />
  </form>
</template>

<style scoped></style>
