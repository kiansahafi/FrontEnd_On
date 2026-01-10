<script setup lang="ts">
import ProgressBar from "@/components/atoms/ProgressBar.vue";
import BaseText from "@/components/atoms/BaseText.vue";

interface Props {
  current: number;
  total: number;
  progress: number;
}

defineProps<Props>();
</script>

<template>
  <div class="question-progress">
    <div class="question-progress__info">
      <BaseText tag="span" variant="caption" color="light">
        Question {{ current + 1 }} of {{ total }}
      </BaseText>
    </div>
    <ProgressBar :progress="progress" />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.question-progress {
  width: 100%;
  max-width: 400px;

  &__info {
    margin-bottom: $spacing-sm;
    text-align: center;
  }
}
</style>
