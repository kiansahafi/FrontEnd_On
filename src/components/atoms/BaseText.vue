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

<style scoped lang="scss" src="./styles/BaseText.scss"></style>
