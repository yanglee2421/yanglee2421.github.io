<script lang="ts" setup>
import DashboardLayout from "@/components/DashboardLayout.vue";
import AtomIcon from "@/components/icons/atom-icon.vue";
import { ref, toValue } from "vue";

interface AtomIconInstance {
  handlePrint(): void;
}

const atom = ref<AtomIconInstance | null>(null);

const handlePrint = () => {
  const i = toValue(atom);

  if (!i) return;

  i.handlePrint();
};
</script>

<template>
  <DashboardLayout>
    <div class="space-y-3 p-3">
      <button class="btn btn-primary" @click="handlePrint">click me</button>
      <AtomIcon ref="atom" />
      <AtomIcon :size="128" />
      <AtomIcon :size="64" />
      <AtomIcon :size="48" />
      <AtomIcon :size="32" />
      <AtomIcon :size="16" />
    </div>
  </DashboardLayout>
</template>

<style></style>
