<script lang="ts" setup>
import { useAuthQuery, useProvideUser, useRefreshToken } from "@/shared/auth";
import * as Vue from "vue";
import { RouterView } from "vue-router";

const { isPending, data } = useAuthQuery();
const refreshToken = useRefreshToken();
useProvideUser(data);

const showLoading = Vue.computed(() => {
  const rt = Vue.toValue(refreshToken);
  const pending = Vue.toValue(isPending);

  if (!rt) {
    return false;
  }

  return pending;
});
</script>

<template>
  <div v-if="showLoading">Loading...</div>
  <RouterView v-else></RouterView>
</template>
