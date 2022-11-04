<script setup>
  import { onMounted, ref, unref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";
  import { resetErrors } from "@/helpers/forms.js";

  import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  const ingredientName = ref("");
  const unitChoices = ref();
  const ingredient = ref({
    name: "",
    price: "",
    magnitude: "",
    unit: "",
  });

  const formErrors = ref({
    name: [],
    price: [],
    magnitude: [],
    unit: [],
  });

  async function updateIngredient() {
    try {
      resetErrors(formErrors);

      const resp = await axios.patch(`/ingredient/${route.params.id}/update/`, {
        ...ingredient.value,
      });

      toast.success("Successfully updated ingredient");
      router.go(-1);
    } catch (error) {
      const e = error.response.data;

      if (e.type == "validation_error") {
        for (let idx in e.errors) {
          formErrors.value[e.errors[idx].attr].push(e.errors[idx].detail);
        }
      }
    }
  }

  async function getIngredientDetails() {
    try {
      const resp = await axios.get(`/ingredient/${route.params.id}/detail/`);
      delete resp.data.id;
      ingredientName.value = resp.data.name;
      ingredient.value = { ...resp.data };
    } catch (error) {
      toast.error("Something went wrong trying to fetch ingredient details");
    }
  }

  async function getUnitChoices() {
    try {
      const resp = await axios.get(
        `/ingredient/get-valid-update-units/?ingredient_id=${route.params.id}`
      );
      unitChoices.value = resp.data;
    } catch (error) {
      toast.error("Could not fetch unit choices");
    }
  }

  onMounted(() => {
    try {
      getUnitChoices();
      getIngredientDetails();
    } catch (error) {
      toast.error("could not load ingredient, please try again");
    }
  });
</script>

<template>
  <DashboardLayout>
    <template #content>
      <DashboardHeading>
        <template #icon>
          <Icon icon="tabler:apple" />
        </template>
        <template #heading> Update {{ ingredientName }} </template>
      </DashboardHeading>
      <form
        @submit.prevent="updateIngredient"
        class="max-w-xl flex flex-col gap-6"
      >
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="name">Name</label>
          <div class="text-sm text-red-700" v-if="formErrors.name">
            <span v-for="error in formErrors.name">{{ error }}</span>
          </div>
          <input type="text" name="name" v-model="ingredient.name" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="price">Price</label>
          <div class="text-sm text-red-700" v-if="formErrors.price">
            <span v-for="error in formErrors.price">{{ error }}</span>
          </div>
          <div
            class="flex items-center bg-white w-full border focus-within:(border-primary)"
          >
            <span class="ml-2 text-lg">R</span>
            <input
              type="text"
              v-model="ingredient.price"
              class="border-none"
              required
            />
          </div>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="magnitude">Magnitude</label>
          <div class="text-sm text-red-700" v-if="formErrors.magnitude">
            <span v-for="error in formErrors.magnitude">{{ error }}</span>
          </div>
          <input type="text" name="magnitude" v-model="ingredient.magnitude" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="unit">Unit</label>
          <div class="text-sm text-red-700" v-if="formErrors.unit">
            <span v-for="error in formErrors.unit">{{ error }}</span>
          </div>
          <select v-model="ingredient.unit" name="unit" required>
            <optgroup v-for="(units, key) in unitChoices" :label="key">
              <option :value="unit[0]" v-for="unit in units">
                {{ unit[1] }}
              </option>
            </optgroup>
          </select>
        </div>
        <button
          class="self-end py-2 px-5 font-semibold text-white border-2 border-green-400 bg-green-400"
        >
          Update
        </button>
      </form>
    </template>
  </DashboardLayout>
</template>

<style>
  input,
  select {
    @apply border py-3 px-2 bg-white w-full focus:(outline-none border-primary);
  }
</style>
