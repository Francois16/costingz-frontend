<template>
  <form
    @submit.prevent="handleLogin"
    class="flex flex-col max-w-sm mx-auto mt-44 text-slate-600 gap-y-3 border rounded p-5 bg-white"
  >
    <h1 class="text-3xl mb-5">Login</h1>

    <div v-if="loginErrorMessage">
      <span class="text-red-600">{{ loginErrorMessage }}</span>
    </div>
    <input
      type="text"
      name="email"
      id="email"
      v-model="userData.email"
      placeholder="Email"
      class="border rounded py-1 px-2"
    />
    <input
      type="password"
      name="password"
      id="password"
      v-model="userData.password"
      placeholder="Password"
      class="border rounded py-1 px-2"
    />
    <button
      class="bg-sky-500 py-1 font-semibold rounded text-lg hover:bg-sky-400 duration-200"
      type="submit"
    >
      Login
    </button>
    <span class="text-sm text-slate-400">
      Don't have an account?
      <router-link class="text-sky-400 hover:underline" to="/register">
        Sign up
      </router-link>
    </span>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/useAuth.js";
import axios from "axios";

const router = useRouter();
const auth = useAuthStore();

const userData = ref({ email: "", password: "" });
const loginErrorMessage = ref("");

function handleLogin() {
  axios
    .post("/auth/jwt/create/", userData.value)
    .then((res) => {
      auth.login(res.data);
      router.push("/");
    })
    .catch((err) => {
      console.log(err);
      if (err.response.status === 401) {
        loginErrorMessage.value =
          "Incorrect email or password, please try again.";
      } else if (err.response.status === 400) {
        loginErrorMessage.value = "Please enter an email and password";
      }
    });
}
</script>

<style></style>
