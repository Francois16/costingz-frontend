<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import { Icon } from "@iconify/vue";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";

  import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

  const route = useRoute();
  const router = useRouter();
  const toast = useToast();

  const unitChoices = ref();
  const ingredient = ref({
    name: "",
    price: "",
    magnitude: "",
    unit: "",
  });

  async function updateIngredient() {
    try {
      const resp = await axios.patch(`/ingredient/${route.params.id}/update/`, {
        ...ingredient.value,
      });

      toast.success("Successfully updated ingredient");
      router.go(-1);
    } catch (error) {
      toast.error(error.response.data.detail[0]);
    }
  }

  async function getIngredientDetails() {
    try {
      const resp = await axios.get(`/ingredient/${route.params.id}/detail/`);
      delete resp.data.id;
      ingredient.value = { ...resp.data };
    } catch (error) {
      toast.error("Something went wrong trying to fetch ingredient details");
    }
  }

  async function getUnitChoices() {
    try {
      const resp = await axios.get("/ingredient/get-all-unit-choices/");
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
        <template #heading> Update {{ ingredient.name }} </template>
      </DashboardHeading>
      <form
        @submit.prevent="updateIngredient"
        class="max-w-xl flex flex-col gap-6"
      >
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="name">Name</label>
          <input type="text" name="name" v-model="ingredient.name" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="price">Price</label>
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
          <span class="text-sm text-slate-400 ml-1">The price you paid</span>
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="magnitude">Magnitude</label>
          <input type="text" name="magnitude" v-model="ingredient.magnitude" />
        </div>
        <div class="flex flex-col gap-1">
          <label class="text-sm" for="unit">Unit</label>
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
