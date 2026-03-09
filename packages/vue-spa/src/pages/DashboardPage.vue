<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { useLogout } from "@/shared/auth";

const handleLogout = useLogout();
</script>

<template>
  <DashboardLayout>
    <div>
      <button @click="handleLogout">LOGOUT</button>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
