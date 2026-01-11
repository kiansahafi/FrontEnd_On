<script setup lang="ts">
interface Props {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "medium",
  disabled: false,
});
</script>

<template>
  <button
    class="base-button"
    :class="[`base-button--${variant}`, `base-button--${size}`]"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped lang="scss" src="./styles/BaseButton.scss"></style>
