<script setup>
  import DashboardSideNav from "@/components/ui/DashboardSideNav.vue";
  import DashboardTopNav from "@/components/ui/DashboardTopNav.vue";
</script>

<template>
  <div class="flex">
    <aside>
      <DashboardSideNav />
    </aside>
    <div class="container flex flex-col w-full">
      <nav>
        <DashboardTopNav />
      </nav>
      <main>
        <slot name="content"></slot>
      </main>
    </div>
  </div>
</template>
