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

<style scoped lang="scss" src="./styles/ProgressBar.scss"></style>
