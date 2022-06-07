<template>
  <form
    class="container border bg-white text-slate-600 p-3 max-w-sm mt-36 rounded"
    @submit.prevent="handleRegister"
  >
    <div class="flex flex-col">
      <h1 class="text-2xl">Register</h1>

      <label class="mt-2" for="first_name">First name:</label>
      <input
        class="border py-0.5 px-3 mt-1 rounded"
        id="first_name"
        type="text"
      />

      <label class="mt-2" for="surname">Surname:</label>
      <input class="border py-0.5 px-3 mt-1 rounded" id="surname" type="text" />

      <label class="mt-2" for="email">Email:</label>
      <input class="border py-0.5 px-3 mt-1 rounded" id="email" type="email" />

      <label class="mt-2" for="password">Password:</label>
      <input
        class="border py-0.5 px-3 mt-1 rounded border-b"
        id="password"
        type="password"
      />

      <label class="mt-2" for="password2">Retype password:</label>
      <input
        class="border py-0.5 px-3 mt-1 rounded"
        id="password2"
        type="password"
      />

      <button
        class="bg-pink-300 py-1 rounded hover:bg-pink-200 duration-200 mt-5"
      >
        Submit
      </button>
      <span class="text-sm text-slate-400 mt-3">
        Already have an account?
        <router-link
          class="text-sky-400 underline underline-transparent underline-offset-4 duration-200 hover:(underline-sky-400)"
          to="/login"
        >
          Login
        </router-link>
      </span>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterView",

  data() {
    return {
      data: {
        first_name: "",
        surname: "",
        email: "",
        password: "",
        password2: "",
      },
    };
  },

  methods: {
    handleRegister() {
      this.registerNewUser();
    },

    registerNewUser() {
      console.log("registering new user");
    },
  },
};
</script>

<style></style>
