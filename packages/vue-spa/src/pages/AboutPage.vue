<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import FluentInput from "@/components/form/FluentInput.vue";
import * as Vue from "vue";

const msg = Vue.ref("hello about");
</script>

<template>
  <DashboardLayout>
    <h1>about</h1>
    <FluentInput v-model="msg" />
  </DashboardLayout>
</template>

<style scoped></style>
