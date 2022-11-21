<script setup>
  import { Icon } from "@iconify/vue";

  import DashboardHeading from "@/components/ui/text/Dashboardheading.vue";
  import PasswordUpdateForm from "@/components/profile/PasswordUpdateForm.vue";
  import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm.vue";
  import BasicFormSkeleton from "@/components/skeletons/forms/BasicFormSkeleton.vue";
</script>

<template>
  <DashboardHeading>
    <template #icon>
      <Icon icon="ep:user-filled" class="text-primary" />
    </template>
    <template #heading>Profile</template>
  </DashboardHeading>
  <div class="grid gap-24">
    <Suspense>
      <template #default>
        <ProfileUpdateForm />
      </template>
      <template #fallback>
        <BasicFormSkeleton />
      </template>
    </Suspense>
    <PasswordUpdateForm />
  </div>
</template>

<style scoped></style>
