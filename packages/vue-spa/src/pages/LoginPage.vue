<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import { useLogin } from "@/shared/auth";

const handleLogin = useLogin();
</script>

<template>
  <DashboardLayout>
    <div>
      <button @click="handleLogin" class="btn-primary btn">LOGIN</button>
    </div>
  </DashboardLayout>
</template>

<style scoped></style>
