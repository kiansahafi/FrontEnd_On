<script setup lang="ts">
interface Props {
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  variant?: "heading" | "subheading" | "body" | "caption";
  color?: "dark" | "light" | "gray";
  uppercase?: boolean;
}

withDefaults(defineProps<Props>(), {
  tag: "p",
  variant: "body",
  color: "dark",
  uppercase: false,
});
</script>

<template>
  <component
    :is="tag"
    class="base-text"
    :class="[
      `base-text--${variant}`,
      `base-text--${color}`,
      { 'base-text--uppercase': uppercase },
    ]"
  >
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.base-text {
  margin: 0;

  &--heading {
    font-family: $font-primary;
    font-weight: $font-weight-bold;
    font-size: $font-size-3xl;
    line-height: 1.2;
    letter-spacing: 2px;

    @media (max-width: $breakpoint-md) {
      font-size: $font-size-2xl;
    }
  }

  &--subheading {
    font-family: $font-primary;
    font-weight: $font-weight-medium;
    font-size: $font-size-xl;
    line-height: 1.4;
    letter-spacing: 1px;

    @media (max-width: $breakpoint-md) {
      font-size: $font-size-lg;
    }
  }

  &--body {
    font-family: $font-secondary;
    font-weight: $font-weight-regular;
    font-size: $font-size-base;
    line-height: 1.6;
  }

  &--caption {
    font-family: $font-secondary;
    font-weight: $font-weight-light;
    font-size: $font-size-sm;
    line-height: 1.5;
  }

  &--dark {
    color: $color-text-dark;
  }

  &--light {
    color: $color-text-light;
  }

  &--gray {
    color: $color-gray-dark;
  }

  &--uppercase {
    text-transform: uppercase;
  }
}
</style>
