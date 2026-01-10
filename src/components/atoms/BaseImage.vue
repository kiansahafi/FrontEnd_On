<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
  objectFit?: "cover" | "contain" | "fill";
}

withDefaults(defineProps<Props>(), {
  objectFit: "cover",
});
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    class="base-image"
    :class="`base-image--${objectFit}`"
  />
</template>

<style scoped lang="scss">
.base-image {
  width: 100%;
  height: 100%;
  display: block;

  &--cover {
    object-fit: cover;
  }

  &--contain {
    object-fit: contain;
  }

  &--fill {
    object-fit: fill;
  }
}
</style>
