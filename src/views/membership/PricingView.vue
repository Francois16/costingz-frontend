<script setup>
import Navbar from "../../components/ui/navbar.vue";
</script>

<template>
  <Navbar />
  <section class="container max-w-6xl mt-20">
    <h3 class="text-5xl text-center font-semibold">Pricing</h3>

    <div class="grid grid-cols-1 md:(grid-cols-3) gap-8 mt-10 text-center">
      <div class="bg-red-400 p-10 flex flex-col gap-5">
        <p class="text-5xl font-bold">Personal</p>
        <p class="text-2xl">$15/pm</p>
        <RouterLink
          to="/subscribe"
          class="bg-slate-800 text-white font-semibold rounded-full py-4 text-xl items-center justify-center"
        >
          Start Free Trial
        </RouterLink>
      </div>
      <div class="bg-blue-400 p-10 flex flex-col gap-5">
        <p class="text-5xl font-bold">Business</p>
        <p class="text-2xl">$25/pm</p>
        <RouterLink
          to="/subscribe"
          class="bg-slate-800 text-white font-semibold rounded-full py-4 text-xl items-center justify-center"
        >
          Start Free Trial
        </RouterLink>
      </div>
      <div class="bg-yellow-400 p-10 flex flex-col gap-5">
        <p class="text-5xl font-bold">Enterprise</p>
        <p class="text-2xl">$75/pm</p>
        <RouterLink
          to="/subscribe"
          class="bg-slate-800 text-white font-semibold rounded-full py-4 text-xl items-center justify-center"
        >
          Start Free Trial
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style></style>
