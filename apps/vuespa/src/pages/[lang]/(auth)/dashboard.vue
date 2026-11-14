<script lang="ts" setup>
import { useLogout } from "@/shared/auth";

const handleLogout = useLogout();
</script>

<template>
  <div>
    <button @click="handleLogout" class="btn-error btn">LOGOUT</button>
  </div>
</template>

<style scoped></style>
