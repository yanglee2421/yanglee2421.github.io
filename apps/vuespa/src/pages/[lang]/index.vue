<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div>[lang]index</div>
  <pre>
  <code>
{{ JSON.stringify(route.params,null,2) }}
</code>
</pre>
</template>

<style scoped></style>
