<script lang="ts" setup>
import { useAuthQuery, useRefreshToken } from "@/shared/auth";
import { computed, toValue } from "vue";
import { RouterView } from "vue-router";

const { isPending } = useAuthQuery();
const refreshToken = useRefreshToken();

const showLoading = computed(() => {
  return toValue(refreshToken) && toValue(isPending);
});
</script>

<template>
  <div v-if="showLoading">Loading...</div>
  <RouterView v-else></RouterView>
</template>

<style scoped></style>
