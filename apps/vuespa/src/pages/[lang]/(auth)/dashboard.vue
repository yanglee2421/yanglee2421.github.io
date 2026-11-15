<script lang="ts" setup>
import { useAuth } from "@/hooks/use-auth";

const store = useAuth();
</script>

<template>
  <div>
    <button @click="store.logout">LOGOUT</button>
  </div>
</template>

<style scoped></style>
