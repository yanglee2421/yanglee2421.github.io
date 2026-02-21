<script lang="ts" setup>
import * as Vue from "vue";

const props = defineProps<{
  modelValue: string;
  disabled?: boolean;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputText = Vue.computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emits("update:modelValue", value);
  },
});
</script>

<template>
  <span class="fui-Input">
    <input
      v-model="inputText"
      type="text"
      placeholder="placeholder text"
      class="fui-Input__input"
      :disabled="props.disabled"
    />
  </span>
</template>

<style scoped>
.fui-Input {
  position: relative;

  display: flex;

  border: 1px solid var(--colorNeutralStroke1);
  border-bottom-color: var(--colorNeutralStrokeAccessible);
  border-radius: var(--borderRadiusMedium);

  background-color: var(--colorNeutralBackground1);

  font-family: var(--fontFamilyBase);
  font-size: var(--fontSizeBase300);
  font-weight: var(--fontWeightRegular);
  line-height: var(--lineHeightBase300);

  vertical-align: middle;

  transition-property: border-color;
  transition-duration: var(--durationUltraFast);
  transition-delay: var(--curveAccelerateMid);

  &::after {
    content: "";

    position: absolute;
    inset-inline: 0;
    inset-block-end: 0;

    display: block;
    height: calc(var(--borderRadiusMedium) * 2);

    margin: -1px;

    border-bottom: 2px solid var(--colorCompoundBrandStroke);
    border-bottom-right-radius: var(--borderRadiusMedium);
    border-bottom-left-radius: var(--borderRadiusMedium);

    clip-path: inset(calc(100% - 2px) 0 0);

    transform: scaleX(0);
    transition: transform var(--durationFast) var(--curveDecelerateMid);
  }
  &:focus-within {
    border: 1px solid var(--colorNeutralStroke1Pressed);
    border-bottom-color: var(--colorNeutralStrokeAccessible);

    &::after {
      transform: scaleX(1);
    }
  }
  &:has(:disabled) {
    border: 1px solid var(--colorNeutralStrokeDisabled);

    cursor: not-allowed;
  }
}
.fui-Input__input {
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-height: 32px;

  padding-inline: var(--spacingHorizontalM);

  border: none;
  outline: none;

  background-color: var(--colorTransparentBackground);

  color: var(--colorNeutralForeground1);

  &::placeholder {
    color: var(--colorNeutralForeground4);
    opacity: 1;
  }

  &:disabled {
    color: var(--colorNeutralForegroundDisabled);

    cursor: not-allowed;

    &::placeholder {
      color: var(--colorNeutralForegroundDisabled);
    }
  }
}
</style>
