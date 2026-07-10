<script lang="ts" setup>
import { useUser } from "@/shared/auth";
import * as Vue from "vue";
import { RouterView } from "vue-router";
import NavigateToHome from "./NavigateToHome.vue";

const user = useUser();

const shouldRedirect = Vue.computed(() => {
  return !!Vue.toValue(user);
});
</script>

<template>
  <NavigateToHome v-if="shouldRedirect" />
  <RouterView v-else></RouterView>
</template>

<style scoped></style>
