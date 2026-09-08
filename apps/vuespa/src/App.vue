<script setup lang="ts">
import { RouterView } from "vue-router";
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <RouterView>
    <template #default="{ Component }">
      <Transition name="fade">
        <component :is="Component" />
      </Transition>
    </template>
  </RouterView>
  <VueQueryDevtools />
</template>

<style scoped>
:global(:root) {
  padding: 0;
  margin: 0;
}

:global(body) {
  padding: 0;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
