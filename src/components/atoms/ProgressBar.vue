<script setup lang="ts">
interface Props {
  progress: number;
}

defineProps<Props>();
</script>

<template>
  <div class="progress-bar">
    <div class="progress-bar__fill" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgba($color-secondary, 0.3);
  overflow: hidden;

  &__fill {
    height: 100%;
    background-color: $color-secondary;
    transition: width $transition-normal;
  }
}
</style>
