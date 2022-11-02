<script setup>
  import { useAuthStore } from "../../stores/useAuth";
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { useToast } from "vue-toastification";

  const auth = useAuthStore();
  const router = useRouter();
  const toast = useToast();

  const email = ref("");
  const password = ref("");

  async function login() {
    try {
      const resp = await axios.post("/auth/jwt/create/", {
        email: email.value,
        password: password.value,
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
      toast.error("Oops! Something went wrong, try again.");
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

        <div v-auto-animate class="text-red-400" id="errors"></div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold" for="email">Email</label>
          <input
            class="bg-stone-100"
            type="email"
            v-model="email"
            placeholder="Email"
            required
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

          <input
            class="bg-stone-100"
            type="password"
            v-model="password"
            placeholder="Password"
            required
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
