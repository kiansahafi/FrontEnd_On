<script setup lang="ts">
import type { Answer } from "@/types/quiz";

interface Props {
  answer: Answer;
  index: number;
}

defineProps<Props>();
defineEmits<{
  (e: "select", answer: Answer): void;
}>();
</script>

<template>
  <button class="answer-option" @click="$emit('select', answer)">
    <span class="answer-option__text">{{ answer.copy }}</span>
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.answer-option {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  width: 100%;
  padding: $spacing-md $spacing-lg;
  background-color: transparent;
  border: 1px solid rgba($color-secondary, 0.4);
  color: $color-text-light;
  cursor: pointer;
  transition: all $transition-normal;
  text-align: center;

  @media (min-width: $breakpoint-sm) {
    padding: $spacing-lg $spacing-xl;
    min-width: 140px;
  }

  @media (min-width: $breakpoint-md) {
    min-width: 180px;
    padding: $spacing-lg $spacing-2xl;
  }

  &:hover {
    background-color: rgba($color-secondary, 0.1);
    border-color: $color-secondary;
  }

  &:active {
    background-color: rgba($color-secondary, 0.15);
  }

  &__text {
    font-family: $font-primary;
    font-weight: $font-weight-regular;
    font-size: $font-size-sm;
    letter-spacing: 0.5px;

    @media (min-width: $breakpoint-sm) {
      font-size: $font-size-base;
    }

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-lg;
    }
  }
}
</style>
