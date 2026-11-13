<script lang="ts" setup>
import { useLogin } from "@/shared/auth";

const handleLogin = useLogin();
</script>

<template>
  <div>
    <button @click="handleLogin" class="btn-primary btn">LOGIN</button>
  </div>
</template>

<style scoped></style>
