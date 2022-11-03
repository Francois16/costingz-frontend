<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/useAuth";
  import { useToast } from "vue-toastification";
  import axios from "axios";

  const auth = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  const credentials = ref({
    email: {
      value: "",
      errors: [],
    },
    password: {
      value: "",
      errors: [],
    },
  });

  async function login() {
    try {
      // Reset errors to empty empty lists
      credentials.value.email.errors = [];
      credentials.value.password.errors = [];

      const resp = await axios.post("/auth/jwt/create/", {
        email: credentials.value.email.value,
        password: credentials.value.password.value,
      });

      // Extract access token from response
      const token = resp.data.access;

      // Set access token in localstorage
      localStorage.setItem("token", token);

      // Authenticated user on frontend
      await auth.setUserAuthenticationStatus();

      toast.success("Successfully logged in!");
      // Redirect to homepage
      router.push("/dashboard");
    } catch (error) {
      if (error.response.data.type == "client_error") {
        toast.error(
          `${error.response.data.errors[0].detail}\nPlease make sure you typed your email and password correctly`,
          { timeout: 8000 }
        );
      } else if (error.response.data.type == "validation_error") {
        const errors = error.response.data.errors;

        for (let key in errors) {
          if (errors[key].attr == "email") {
            credentials.value.email.errors.push(errors[key].detail);
          } else if (errors[key].attr == "password") {
            credentials.value.password.errors.push(errors[key].detail);
          }
        }
      }
      auth.logout();
    }
  }
</script>

<template>
  <div class="bg-paper min-h-screen">
    <div class="container">
      <router-link
        to="/"
        class="text-lg text-blue-400 underline underline-transparent duration-200 underline-offset-4 hover:(underline-current)"
        >&#8592; Home</router-link
      >
    </div>
    <div class="min-w-xs center sm:(min-w-sm) md:(min-w-lg)">
      <form @submit.prevent="login">
        <h1 class="font-bold text-center text-3xl capitalize">Welcome Back!</h1>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="email">Email</label>
          <div v-if="credentials.email.errors">
            <span
              class="text-red-700"
              v-for="error in credentials.email.errors"
            >
              {{ error }}
            </span>
          </div>
          <input
            class="bg-stone-100"
            type="email"
            v-model="credentials.email.value"
            placeholder="Email"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="password">
            Password
            <router-link
              class="font-normal text-sm ml-1 text-slate-400 decoration"
              to="/"
            >
              Forgot
            </router-link>
          </label>
          <div v-if="credentials.password.errors">
            <span
              class="text-red-700"
              v-for="error in credentials.password.errors"
            >
              {{ error }}
            </span>
          </div>
          <input
            class="bg-stone-100"
            type="password"
            v-model="credentials.password.value"
            placeholder="Password"
          />
        </div>
        <button
          class="rounded-md font-semibold bg-stone-400 text-white p-3 duration-200 uppercase hover:(bg-stone-400/90)"
          type="submit"
        >
          Sign In
        </button>
        <p class="mt-10 text-center text-sm text-slate-500">
          Not a member?
          <router-link
            to="/register"
            class="text-slate-400 underline underline-slate-400 underline-offset-4 hover:(text-blue-500 underline-blue-500)"
          >
            Sign up now
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
