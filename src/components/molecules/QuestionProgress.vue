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

<style scoped lang="scss" src="./styles/QuestionProgress.scss"></style>
