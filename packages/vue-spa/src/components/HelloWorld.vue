<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div class="p-[var(--spacingHorizontalL)] TeamsLight">
    <h1 class="display">{{ msg }}</h1>
    <div class="card">
      <button
        type="button"
        @click="count++"
        bg="blue-500 hover:blue-600 active:blue-700 disabled:gray-300"
        border="~ transparent"
        class="disabled:opacity-50 disabled:cursor-not-allowed rounded px-3 py-1.5 outline-none text-white font-medium uppercase transition duration-150 ease-in-out cursor-pointer"
        disabled
      >
        count is {{ count }}
      </button>
      <p class="body2">
        Edit
        <code
          class="font-[var(--fontFamilyMonospace)] text-[var(--colorNeutralStroke1)]"
          >components/HelloWorld.vue</code
        >
        to test HMR
      </p>
    </div>

    <p class="body2">
      Check out
      <a
        href="https://vuejs.org/guide/quick-start.html#local"
        target="_blank"
        class="text-[var(--colorBrandForegroundLink)] hover:underline hover:underline-offset-2"
        >create-vue</a
      >, the official Vue + Vite starter
    </p>
    <p class="body2">
      Learn more about IDE Support for Vue in the
      <a
        href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
        target="_blank"
        class="text-[var(--colorBrandForegroundLink)] hover:underline hover:underline-offset-2"
        >Vue Docs Scaling up Guide</a
      >.
    </p>
    <p class="body2">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
