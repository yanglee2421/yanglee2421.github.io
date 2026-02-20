<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView>
    <template #default="{ Component }">
      <component :is="Component" />
    </template>
  </RouterView>
</template>

<style scoped></style>
