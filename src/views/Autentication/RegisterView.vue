<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "@/helpers/axios.js";

  const router = useRouter();

  const credentials = ref({
    email: {
      value: "",
      errors: [],
    },
    firstName: {
      value: "",
      errors: [],
    },
    surname: {
      value: "",
      errors: [],
    },
    password: {
      value: "",
      errors: [],
    },
    confirmPassword: {
      value: "",
      errors: [],
    },
  });

  async function onSubmit() {
    try {
      const resp = await axios.post("/auth/users/", {
        email: credentials.value.email.value,
        first_name: credentials.value.firstName.value,
        surname: credentials.value.surname.value,
        password: credentials.value.password.value,
        re_password: credentials.value.confirmPassword.value,
      });

      router.push({ name: "login" });
    } catch (error) {
      console.log(error.response.data);
    }
  }
</script>

<template>
  <div class="min-h-screen">
    <div class="container">
      <router-link
        to="/"
        class="text-lg text-blue-400 underline underline-transparent duration-200 underline-offset-4 hover:(underline-current)"
      >
        &#8592; Home
      </router-link>
    </div>
    <div class="min-w-xs center sm:(min-w-sm) md:(min-w-lg)">
      <form @submit.prevent="onSubmit" autocomplete="off">
        <h1 class="font-bold text-center text-3xl capitalize">Register</h1>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="email">Email</label>
          <input
            class="bg-stone-100"
            type="email"
            placeholder="Email"
            v-model="credentials.email.value"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label class="font-semibold" for="first_name">First Name</label>
          <input
            class="bg-stone-100"
            type="text"
            placeholder="First Name"
            name="first_name"
            v-model="credentials.firstName.value"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="surname">Surname</label>
          <input
            class="bg-stone-100"
            type="text"
            placeholder="First Name"
            name="surname"
            v-model="credentials.surname.value"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="password">Password</label>
          <input
            class="bg-stone-100"
            type="password"
            placeholder="Password"
            name="password"
            v-model="credentials.password.value"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="confirmPassword">
            Confirm Password
          </label>
          <input
            class="bg-stone-100"
            type="password"
            placeholder="Confirm Password"
            name="confirmPasword"
            v-model="credentials.confirmPassword.value"
          />
        </div>
        <button
          class="rounded-md font-semibold bg-stone-400 text-white p-3 duration-200 uppercase hover:(bg-stone-400/90)"
          type="submit"
        >
          Register
        </button>
        <p class="mt-10 text-center text-sm text-slate-500">
          Already a member?
          <router-link
            :to="{ name: 'login' }"
            class="text-slate-400 underline underline-slate-400 underline-offset-4 hover:(text-blue-500 underline-blue-500)"
          >
            Login
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
  .center {
    @apply transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute;
  }

  form {
    @apply bg-white rounded-lg flex flex-col px-8 pt-16 pb-8 shadow-2xl gap-3;
  }

  input {
    @apply border rounded-md py-3 px-4;
  }

  .decoration {
    @apply duration-200 underline underline-slate-400 underline-offset-4 hover:(underline-blue-500 text-blue-500);
  }
</style>
