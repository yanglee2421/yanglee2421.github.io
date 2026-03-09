<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { useLogin } from "@/shared/auth";

const handleLogin = useLogin();
</script>

<template>
  <DashboardLayout>
    <div>
      <button @click="handleLogin">LOGIN</button>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
