<script setup lang="ts">
const props = defineProps<{ msg: string }>();
</script>

<template>
  <h1 class="display">{{ props.msg }}</h1>
</template>

<style scoped></style>
