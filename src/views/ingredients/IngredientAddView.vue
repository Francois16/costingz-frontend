<script setup>
  import { Icon } from "@iconify/vue";
  import { onMounted, ref } from "vue";
  import { useToast } from "vue-toastification";
  import { useRouter } from "vue-router";
  import axios from "@/helpers/axios.js";

  import DashboardLayout from "@/components/layouts/DashboardLayout.vue";
  import DashboardHeading from "@/components/ui/text/DashboardHeading.vue";

  const toast = useToast();
  const router = useRouter();
  const units = ref(null);

  const name = ref("");
  const price = ref("");
  const magnitude = ref("");
  const unit = ref("");
  const errors = ref();

  async function createIngredient() {
    try {
      const resp = await axios.post("/ingredient/create/", {
        name: name.value,
        price: price.value,
        magnitude: magnitude.value,
        unit: unit.value,
      });

      toast.success("Successfully added ingredient");
      router.go(-1);
    } catch (error) {
      errors.value = error.response.data.detail;
      toast.error("Something went wrong, please try again");
    }
  }

  async function getUnitChoices() {
    try {
      const resp = await axios.get("/ingredient/get-all-unit-choices/");
      units.value = resp.data;
    } catch (error) {
      toast.error("Something went wrong while trying to fetch unit choices");
    }
  }

  onMounted(() => {
    getUnitChoices();
  });
</script>

<template>
  <DashboardLayout>
    <template v-slot:content>
      <DashboardHeading>
        <template v-slot:icon>
          <Icon icon="tabler:apple" />
        </template>
        <template v-slot:heading> Create new Ingredient </template>
      </DashboardHeading>

      <form
        @submit.prevent="createIngredient"
        class="max-w-xl flex flex-col gap-6"
      >
        <div
          class="flex flex-col gap-2"
          v-if="errors"
        >
          <div
            class="bg-red-200 text-red-600 py-1 px-3 rounded"
            v-for="(errorMessages, key) in errors"
          >
            <span class="font-bold"> {{ key }}: </span>
            <span v-for="errorMessage in errorMessages">
              {{ errorMessage }}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <label
            class="text-sm"
            for="name"
            >Name</label
          >
          <input
            type="text"
            v-model="name"
            placeholder="eg. Apples"
            required
          />
          <span class="text-sm text-slate-400 ml-1"
            >The name of your ingredient</span
          >
        </div>
        <div class="flex flex-col gap-1">
          <label
            class="text-sm"
            for="price"
            >Price</label
          >
          <div
            class="flex items-center bg-white w-full border focus-within:(border-primary)"
          >
            <span class="ml-2 text-lg">R</span>
            <input
              type="text"
              v-model="price"
              placeholder="eg. 1.43"
              class="border-none"
              required
            />
          </div>
          <span class="text-sm text-slate-400 ml-1">The price you paid</span>
        </div>
        <div class="flex flex-col gap-1">
          <label
            class="text-sm"
            for="magnitude"
            >Magnitude</label
          >
          <input
            type="text"
            v-model="magnitude"
            placeholder="eg. 1.35"
            required
          />
          <span class="text-sm text-slate-400 ml-1"
            >The weight/size that you bought it for</span
          >
        </div>
        <div class="flex flex-col gap-1">
          <label
            class="text-sm"
            for="unit"
            >Unit</label
          >
          <select
            v-model="unit"
            name="unit"
            required
          >
            <option
              value=""
              selected
              hidden
            >
              --- Please select an option ---
            </option>
            <optgroup
              v-for="(units, key) in units"
              :label="key"
            >
              <option
                :value="unit[0]"
                v-for="unit in units"
              >
                {{ unit[1] }}
              </option>
            </optgroup>
          </select>
          <span class="text-sm text-slate-400 ml-1"
            >The unit that you bought it in</span
          >
        </div>
        <button
          class="self-end bg-green-600 border border-green-600 py-3 px-5 font-semibold text-white duration-200 hover:(bg-white text-green-600)"
        >
          Create
        </button>
      </form>
    </template>
  </DashboardLayout>
</template>

<style scoped>
  input,
  select,
  option {
    @apply py-3 px-2 border bg-white text-lg w-full focus: (outline-none border-primary);
  }

  option {
    @apply text-body;
  }
</style>
