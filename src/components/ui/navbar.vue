<template>
  <header class="w-full py-3 bg-white border-b">
    <nav class="container flex items-center justify-between">
      <div class="flex items-center justify-start gap-x-10">
        <h1 class="text-3xl">
          Costingz<span class="text-3xl text-emerald-500">.</span>
        </h1>
        <div class="flex flex-row items-center justify-center text-slate-600 gap-3 text-sm">
          <RouterLink class="hover:text-emerald-600 duration-200 py-1 px-2 rounded" to="/">
            Home
          </RouterLink>
          <RouterLink class="hover:text-emerald-600 duration-200 py-1 px-2 rounded" to="/about">
            About
          </RouterLink>
          <RouterLink class="hover:text-emerald-600 duration-200 py-1 px-2 rounded" to="/pricing">
            Pricing
          </RouterLink>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 text-sm text-slate-600">
        <RouterLink class="hover:text-emerald-600 duration-200 py-1 px-2 rounded" to="/accounts/login">
          Login
        </RouterLink>
        <RouterLink class="hover:text-emerald-600 duration-200 py-1 px-2 rounded" to="/accounts/signup">
          Signup
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
};
</script>

<style scoped>
.router-link-active {
  background-color: pink;
}

.router-link-active:hover {
  color: inherit;
  cursor: default;
}
</style>