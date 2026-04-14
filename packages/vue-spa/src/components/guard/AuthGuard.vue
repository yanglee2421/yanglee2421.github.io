<script lang="ts" setup>
import { useUser } from "@/shared/auth";
import * as Vue from "vue";
import { RouterView } from "vue-router";
import NavigateToLogin from "./NavigateToLogin.vue";

const user = useUser();

const shouldRedirect = Vue.computed(() => {
  return !Vue.toValue(user);
});
</script>

<template>
  <NavigateToLogin v-if="shouldRedirect" />
  <RouterView v-else></RouterView>
</template>

<style scoped></style>
