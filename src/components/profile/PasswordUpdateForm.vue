<script setup>
  import { ref } from "vue";
  import { useToast } from "vue-toastification";
  import { useAuthStore } from "@/stores/useAuth.js";

  import BaseInput from "@/components/ui/forms/BaseInput.vue";
  import Button from "@/components/ui/buttons/Button.vue";

  import axios from "@/helpers/axios.js";

  const toast = useToast();
  const auth = useAuthStore();

  const formData = ref({
    new_password: "",
    re_new_password: "",
    current_password: "",
  });

  const submit = async () => {
    try {
      await axios.post("auth/users/set_password/", formData.value);

      toast.success("Successfully updated password");
      auth.logout();
    } catch (error) {
      console.log(error);
    }
  };
</script>

<template>
  <form
    @submit.prevent="submit"
    class="max-w-2xl bg-white p-10 shadow-2xl rounded flex flex-col gap-5"
  >
    <p class="text-xl font-bold tracking-wide">Change Password</p>

    <!-- Input prevents browsers from autofilling the old password field -->
    <BaseInput class="hidden" type="password" />
    <BaseInput
      type="password"
      label="Old Password"
      v-model="formData.current_password"
    />
    <BaseInput
      type="password"
      label="New Password"
      v-model="formData.new_password"
    />
    <BaseInput
      type="password"
      label="Retype New Password"
      v-model="formData.re_new_password"
    />
    <Button type="submit" text="Update Password" />
  </form>
</template>

<style scoped></style>
