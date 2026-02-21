<script lang="ts" setup>
import * as Vue from "vue";

const props = defineProps<{
  modelValue: string;
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
      placeholder="ssss"
      class="fui-Input__input"
    />
  </span>
</template>

<style scoped>
/* -------------------------------------------------------------------------
   Root Container (.fui-Input)
   ------------------------------------------------------------------------- */
.fui-Input {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--spacingHorizontalXXS);
  border-radius: var(--borderRadiusMedium);
  position: relative;
  box-sizing: border-box;
  vertical-align: middle;

  /* Default Typography (Body1) */
  font-family: "Segoe UI", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;

  /* Default Appearance: Outline */
  background-color: var(--colorNeutralBackground1);
  border: 1px solid var(--colorNeutralStroke1);
  border-bottom-color: var(--colorNeutralStrokeAccessible);

  /* Default Size: Medium */
  min-height: 32px;
}

/* -------------------------------------------------------------------------
   Focus Indicator (The bottom line animation)
   ------------------------------------------------------------------------- */
.fui-Input::after {
  box-sizing: border-box;
  content: "";
  position: absolute;
  left: -1px;
  bottom: -1px;
  right: -1px;

  /* Height logic: max(2px, radius) */
  height: max(2px, var(--borderRadiusMedium));

  border-bottom-left-radius: var(--borderRadiusMedium);
  border-bottom-right-radius: var(--borderRadiusMedium);

  border-bottom: 2px solid var(--colorCompoundBrandStroke);
  clip-path: inset(calc(100% - 2px) 0 0 0);

  /* Animation: Scale X from 0 to 1 */
  transform: scaleX(0);
  transition-property: transform;
  transition-duration: var(--durationUltraFast);
  transition-delay: var(--curveAccelerateMid);
}

.fui-Input:focus-within::after {
  transform: scaleX(1);
  transition-duration: var(--durationNormal);
  transition-delay: var(--curveDecelerateMid);
}

.fui-Input:focus-within:active::after {
  border-bottom-color: var(--colorCompoundBrandStrokePressed);
}

.fui-Input:focus-within {
  outline: 2px solid transparent;
}

/* -------------------------------------------------------------------------
   Input Element (.fui-Input__input)
   ------------------------------------------------------------------------- */
.fui-Input__input {
  align-self: stretch;
  box-sizing: border-box;
  flex-grow: 1;
  min-width: 0;
  border-style: none; /* No border for the actual input, wrapper handles it */
  padding: 0;

  /* Default Padding for Medium Combined (Root + Input) logic calculated below */
  padding-left: var(--spacingHorizontalMNudge); /* default fallback */
  padding-right: var(--spacingHorizontalMNudge);

  color: var(--colorNeutralForeground1);
  background-color: transparent;
  outline-style: none;

  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.fui-Input__input::placeholder {
  color: var(--colorNeutralForeground4);
  opacity: 1;
}

/* -------------------------------------------------------------------------
   Icons / Content (.fui-Input__contentBefore, .fui-Input__contentAfter)
   ------------------------------------------------------------------------- */
.fui-Input__contentBefore,
.fui-Input__contentAfter {
  box-sizing: border-box;
  color: var(--colorNeutralForeground3);
  display: flex;
  align-items: center; /* Generally centering is good */
}

.fui-Input__contentBefore > svg,
.fui-Input__contentAfter > svg {
  font-size: 20px; /* Default Medium Size */
}

/* -------------------------------------------------------------------------
   Sizes
   ------------------------------------------------------------------------- */

/* Small */
.fui-Input.small {
  min-height: 24px;
  font-size: 12px; /* Caption1 */
  line-height: 16px;
}
.fui-Input.small .fui-Input__input {
  padding-left: var(--spacingHorizontalS);
  padding-right: var(--spacingHorizontalS);
}
.fui-Input.small .fui-Input__contentBefore > svg,
.fui-Input.small .fui-Input__contentAfter > svg {
  font-size: 16px;
}

/* Large */
.fui-Input.large {
  min-height: 40px;
  font-size: 16px; /* Body2 */
  line-height: 22px;
  gap: var(--spacingHorizontalSNudge);
}
.fui-Input.large .fui-Input__input {
  padding-left: calc(
    var(--spacingHorizontalM) + var(--spacingHorizontalSNudge)
  );
  padding-right: calc(
    var(--spacingHorizontalM) + var(--spacingHorizontalSNudge)
  );
}
.fui-Input.large .fui-Input__contentBefore > svg,
.fui-Input.large .fui-Input__contentAfter > svg {
  font-size: 24px;
}

/* -------------------------------------------------------------------------
   Appearances
   ------------------------------------------------------------------------- */

/* Outline (Standard) Interactive States */
.fui-Input.outline:not(.disabled):hover {
  border-color: var(--colorNeutralStroke1Hover);
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);
}
.fui-Input.outline:not(.disabled):active,
.fui-Input.outline:not(.disabled):focus-within {
  border-color: var(--colorNeutralStroke1Pressed);
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);
}

/* Underline */
.fui-Input.underline {
  background-color: var(--colorTransparentBackground);
  border-radius: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: var(--colorNeutralStrokeAccessible);
}
.fui-Input.underline::after {
  left: 0;
  right: 0;
  border-radius: 0; /* Remove corners for underline focus */
}
.fui-Input.underline:not(.disabled):hover {
  border-bottom-color: var(--colorNeutralStrokeAccessibleHover);
}
.fui-Input.underline:not(.disabled):active,
.fui-Input.underline:not(.disabled):focus-within {
  border-bottom-color: var(--colorNeutralStrokeAccessiblePressed);
}

/* Filled (Darker / Lighter) */
.fui-Input.filled-darker {
  background-color: var(--colorNeutralBackground3);
  border-color: var(--colorTransparentStroke);
}
.fui-Input.filled-lighter {
  background-color: var(--colorNeutralBackground1);
  border-color: var(--colorTransparentStroke);
}
.fui-Input[class*="filled"]:not(.disabled):hover,
.fui-Input[class*="filled"]:not(.disabled):focus-within {
  border-color: var(--colorTransparentStrokeInteractive);
}

/* Invalid State */
.fui-Input.invalid:not(:focus-within),
.fui-Input.invalid:hover:not(:focus-within) {
  border-color: var(--colorPaletteRedBorder2);
}

/* -------------------------------------------------------------------------
   Disabled State
   ------------------------------------------------------------------------- */
.fui-Input.disabled {
  cursor: not-allowed;
  background-color: var(--colorTransparentBackground);
  border-color: var(--colorNeutralStrokeDisabled);
}

.fui-Input.disabled .fui-Input__input {
  color: var(--colorNeutralForegroundDisabled);
  cursor: not-allowed;
}

.fui-Input.disabled .fui-Input__input::placeholder {
  color: var(--colorNeutralForegroundDisabled);
}

.fui-Input.disabled .fui-Input__contentBefore,
.fui-Input.disabled .fui-Input__contentAfter {
  color: var(--colorNeutralForegroundDisabled);
}

/* Remove focus border in disabled state */
.fui-Input.disabled::after {
  content: unset;
}
</style>
