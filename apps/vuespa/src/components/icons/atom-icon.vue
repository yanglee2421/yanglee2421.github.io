<script lang="ts" setup>
import { ref, toValue, watchPostEffect } from "vue";

interface Props {
  size?: number;
}

const props = withDefaults(defineProps<Props>(), { size: 256 });

const canvas = ref<HTMLCanvasElement | null>(null);

const handlePrint = async () => {
  const el = toValue(canvas);

  if (!el) return;

  const blob = await new Promise<Blob | null>((resolve) => {
    el.toBlob(
      (result) => {
        resolve(result);
      },
      "image/png",
      1,
    );
  });

  if (!blob) return;

  const a = document.createElement("a");
  a.textContent = "下载";
  document.body.appendChild(a);
  a.style.display = "block";
  a.download = `icon.png`;
  a.href = window.URL.createObjectURL(blob);
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
};

defineExpose({ handlePrint });

watchPostEffect(() => {
  const size = props.size;
  const el = toValue(canvas);
  const ctx = el?.getContext("2d");
  const x = size / 2;
  const y = size / 2;
  const containerRadius = size / 2;
  const scale = size / 256;

  if (!ctx) return;
  ctx.fillStyle = "oklch(58.5% 0.233 277.117)";

  ctx.beginPath();
  ctx.arc(x, y, containerRadius, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.strokeStyle = "white";
  ctx.lineWidth = 16 * scale;

  ctx.beginPath();
  ctx.ellipse(x, y, 48 * scale, 96 * scale, Math.PI / 4, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(x, y, 48 * scale, 96 * scale, -Math.PI / 4, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.arc(x, y, 16 * scale, 0, Math.PI * 2, true);

  ctx.fill();
});
</script>

<template>
  <canvas ref="canvas" :width="size" :height="size" class="border"></canvas>
</template>

<style scoped></style>
