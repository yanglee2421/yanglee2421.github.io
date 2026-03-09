<script lang="ts" setup>
import { useUser } from "@/shared/auth";
import { toValue, watchEffect } from "vue";
import { RouterView, useRouter } from "vue-router";

const router = useRouter();
const user = useUser();

watchEffect(() => {
  const userValue = toValue(user);
  if (!userValue) return;

  router.push({ name: "dashboard" });
});
</script>

<template>
  <RouterView></RouterView>
</template>

<style scoped></style>
