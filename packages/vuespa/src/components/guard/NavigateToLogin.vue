<script setup lang="ts">
import * as Vue from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const handleRedirect = () => {
  router.push({ name: "login", query: { redirect: route.path } });
};

Vue.watchEffect(() => {
  const currentRouteName = route.name;

  if (currentRouteName === "login") {
    return;
  }

  handleRedirect();
});
</script>

<template>
  <div class="fixed inset-0 grid place-items-center">
    <div class="flex flex-col items-center justify-center gap-3">
      <h1 class="text-3xl">You need to login first</h1>
      <p>Please click the button below to go to the login page.</p>
      <button @click="handleRedirect" class="btn btn-primary">
        Take me to login
      </button>
    </div>
  </div>
</template>
