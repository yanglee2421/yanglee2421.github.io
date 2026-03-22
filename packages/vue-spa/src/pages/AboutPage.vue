<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import * as Vue from "vue";

const msg = Vue.ref("hello about");
</script>

<template>
  <DashboardLayout>
    <h1>about</h1>
    <input class="input" v-model="msg" />
    <button class="btn btn-primary">click me</button>
  </DashboardLayout>
</template>

<style scoped></style>
