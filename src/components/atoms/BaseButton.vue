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

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.base-button {
  @include button-base;
  font-size: $font-size-sm;
  border-radius: 0;

  &--primary {
    background-color: $color-primary;
    color: $color-text-light;

    &:hover:not(:disabled) {
      background-color: color.adjust($color-primary, $lightness: 10%);
      transform: translateY(-2px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--secondary {
    background-color: $color-secondary;
    color: $color-text-dark;
    border: 2px solid $color-primary;

    &:hover:not(:disabled) {
      background-color: $color-primary;
      color: $color-text-light;
    }
  }

  &--outline {
    background-color: transparent;
    color: $color-text-light;
    border: 2px solid $color-text-light;

    &:hover:not(:disabled) {
      background-color: $color-text-light;
      color: $color-text-dark;
    }
  }

  &--small {
    padding: $spacing-sm $spacing-md;
    font-size: $font-size-xs;
  }

  &--medium {
    padding: $spacing-md $spacing-xl;
    font-size: $font-size-sm;
  }

  &--large {
    padding: $spacing-lg $spacing-2xl;
    font-size: $font-size-base;
  }
}
</style>
