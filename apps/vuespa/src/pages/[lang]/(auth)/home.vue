<script lang="ts" setup>
import { useAuth } from "@/hooks/use-auth";

const auth = useAuth();
</script>

<template>
  <div>
    <h1>home</h1>
    <button
      @click="auth.logout"
      class="cursor-pointer rounded bg-indigo-400 px-2 py-1 text-white hover:bg-indigo-500 active:bg-indigo-600"
    >
      logout
    </button>
  </div>
</template>

<style scoped></style>
