<script setup>
  import { ref } from "vue";
  import { useToast } from "vue-toastification";
  import axios from "@/helpers/axios.js";

  import BaseInput from "@/components/ui/forms/BaseInput.vue";
  import Button from "@/components/ui/buttons/Button.vue";

  const toast = useToast();

  const loadProfileData = async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000));
      const resp = await axios.get("/accounts/profile/update-user/");
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  };

  const submit = async () => {
    try {
      await axios.patch("/accounts/profile/update-user/", profile.value);
      toast.success("Successfully updated profile data");
    } catch (error) {
      console.log(error);
    }
  };

  const profile = ref(await loadProfileData());
</script>

<template>
  <form
    @submit.prevent="submit"
    v-if="profile"
    class="max-w-2xl bg-white p-10 shadow-2xl rounded flex flex-col gap-5"
  >
    <p class="text-xl font-bold tracking-wide">Profile Overview</p>
    <div class="grid sm:(grid-cols-2) gap-5">
      <BaseInput v-model="profile.user.first_name" label="First Name" />
      <BaseInput v-model="profile.user.surname" label="Surname" />
    </div>
    <div class="grid sm:(grid-cols-2) gap-5">
      <BaseInput v-model="profile.username" label="Username" />
      <BaseInput v-model="profile.user.email" label="Email" />
    </div>
    <div class="grid sm:(grid-cols-2) gap-5">
      <BaseInput v-model="profile.phone" label="Phone Number" />
    </div>

    <!-- Upload field for user profile picture -->
    <!-- <div class="flex flex-col items-center justify-center w-full">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <Icon icon="mi:cloud-upload" class="w-20 h-20 text-gray-400" />
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span class="font-semibold">Click to upload your Avatar</span> or
            drag and drop the file here.
          </p>
        </div>
        <input id="dropzone-file" type="file" accept="image/*" class="hidden" />
      </label>
    </div> -->

    <Button text="Save Details" />
    <!-- <button
      class="self-end border-2 border-emerald-600 text-emerald-600 py-2 px-5 hover:(bg-emerald-600 text-white) duration-200 rounded font-semibold"
    >
      Save Details
    </button> -->
  </form>
</template>

<style scoped></style>
