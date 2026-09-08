<script setup lang="ts">
import * as Vue from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const targetRoute = Vue.computed(() => {
  const redirectPath = route.query.redirect as string | undefined;

  if (typeof redirectPath !== "string") {
    return { name: "home" };
  }

  if (!redirectPath) {
    return { name: "home" };
  }

  return { path: redirectPath };
});

const shouldRedirect = Vue.computed(() => {
  const target = Vue.toValue(targetRoute);

  if (target.name === route.name) {
    return false;
  }

  if (target.path === route.path) {
    return false;
  }

  return true;
});

const handleRedirect = () => {
  const target = Vue.toValue(targetRoute);

  router.replace(target);
};

Vue.watchEffect(() => {
  const doRedirect = Vue.toValue(shouldRedirect);

  if (!doRedirect) return;

  handleRedirect();
});
</script>

<template>
  <div class="fixed inset-0 z-20 grid place-items-center">
    <div class="flex flex-col items-center justify-center gap-3">
      <h1 class="text-3xl">You seem aready has logined</h1>
      <p>Please click the button below to go to the home page.</p>
      <button @click="handleRedirect" class="btn btn-primary">
        Take me to Home
      </button>
    </div>
  </div>
</template>
