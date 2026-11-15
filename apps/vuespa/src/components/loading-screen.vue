<script lang="ts" setup>
import { watchPostEffect } from "vue";

watchPostEffect(() => {
  console.log("Loading screen mount");
});
</script>

<template>
  <div>
    <p class="animate-bounce">Loading</p>
  </div>
</template>

<style scoped></style>
