<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
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
    <span class="answer-option__letter">{{
      String.fromCharCode(65 + index)
    }}</span>
    <BaseText tag="span" variant="body" color="light">
      {{ answer.copy }}
    </BaseText>
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.answer-option {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  width: 100%;
  padding: $spacing-lg $spacing-xl;
  background-color: transparent;
  border: 1px solid rgba($color-secondary, 0.3);
  color: $color-text-light;
  cursor: pointer;
  transition: all $transition-normal;
  text-align: left;

  &:hover {
    background-color: rgba($color-secondary, 0.1);
    border-color: $color-secondary;
    transform: translateX(10px);
  }

  &:active {
    transform: translateX(5px);
  }

  &__letter {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 1px solid $color-secondary;
    border-radius: $border-radius-round;
    font-family: $font-primary;
    font-weight: $font-weight-semibold;
    font-size: $font-size-sm;
    flex-shrink: 0;
  }
}
</style>
