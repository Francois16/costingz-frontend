<template>
  <form
    @submit.prevent="handleLogin"
    class="
      flex flex-col
      max-w-sm
      mx-auto
      mt-44
      text-slate-600
      gap-y-3
      border
      rounded
      p-5
      bg-white
    "
  >
    <h1 class="text-3xl mb-5">Login</h1>
    <input
      type="text"
      name="email"
      id="email"
      v-model="loginCredentials.email"
      placeholder="Email"
      class="border rounded py-1 px-2"
    />
    <input
      type="password"
      name="password"
      id="password"
      v-model="loginCredentials.password"
      placeholder="Password"
      class="border rounded py-1 px-2"
    />
    <button
      class="
        bg-sky-500
        py-1
        font-semibold
        rounded
        text-lg
        hover:bg-sky-400
        duration-200
      "
      type="submit"
    >
      Login
    </button>
    <span class="text-sm text-slate-400">
      Don't have an account?
      <router-link class="text-sky-400 hover:underline" to="/accounts/signup">
        Sign up
      </router-link>
    </span>
  </form>
</template>

<script>
export default {
  name: "LoginView",

  data() {
    return {
      loginCredentials: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    handleLogin() {
      console.log("loggin in...");
    },
  },
};
</script>

<style>
</style>