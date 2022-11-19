<script setup>
  import { ref, onMounted } from "vue";
  import { Icon } from "@iconify/vue";
  import { useToast } from "vue-toastification";

  import axios from "@/helpers/axios.js";

  import DashboardHeading from "@/components/ui/text/Dashboardheading.vue";
  import BaseInput from "@/components/ui/forms/BaseInput.vue";

  const toast = useToast();

  const profile = ref({});

  async function updateUserProfile() {
    try {
      console.log(profile.value);
      const resp = await axios.patch(
        "/accounts/profile/update-user/",
        profile.value
      );
      toast.success("Successfully updated profile data");
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(async () => {
    try {
      const resp = await axios.get("/accounts/profile/update-user/");

      profile.value = resp.data;
    } catch (error) {
      console.log(error);
    }
  });
</script>

<template>
  <DashboardHeading>
    <template #icon>
      <Icon icon="ep:user-filled" class="text-primary" />
    </template>
    <template #heading>Profile</template>
  </DashboardHeading>

  <form
    @submit.prevent="updateUserProfile"
    v-if="Object.keys(profile).length"
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

    <button
      class="self-end border-2 border-emerald-600 text-emerald-600 py-2 px-5 hover:(bg-emerald-600 text-white) duration-200 rounded font-semibold"
    >
      Save Details
    </button>
  </form>
</template>

<style scoped></style>
