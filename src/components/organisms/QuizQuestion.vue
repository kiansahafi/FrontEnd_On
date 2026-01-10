<script setup lang="ts">
import AnswerOption from "@/components/molecules/AnswerOption.vue";
import type { Question, Answer } from "@/types/quiz";

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  progress: number;
}

defineProps<Props>();
defineEmits<{
  (e: "answer", answer: Answer): void;
}>();
</script>

<template>
  <div class="quiz-question">
    <div class="quiz-question__header">
      <span class="quiz-question__header-title">TRY ON QUIZ</span>
      <span class="quiz-question__header-subtitle">30 DAYS RISK FREE</span>
    </div>

    <div class="quiz-question__content">
      <h2 class="quiz-question__title">
        {{ question.copy }}
      </h2>

      <div class="quiz-question__answers">
        <AnswerOption
          v-for="(answer, index) in question.answers"
          :key="index"
          :answer="answer"
          :index="index"
          @select="$emit('answer', answer)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.quiz-question {
  @include flex-column-center;
  min-height: calc(100vh - 86px);
  padding: 86px $spacing-md $spacing-xl;
  animation: fadeIn $transition-normal forwards;

  @media (min-width: $breakpoint-md) {
    padding: 86px $spacing-xl $spacing-xl;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-xs;
    margin-top: $spacing-2xl;
    margin-bottom: $spacing-2xl;
    text-align: center;
    padding-top: $spacing-lg;

    @media (min-width: $breakpoint-md) {
      margin-top: $spacing-3xl;
      margin-bottom: $spacing-3xl;
      padding-top: $spacing-xl;
    }
  }

  &__header-title {
    font-family: $font-primary;
    font-weight: $font-weight-regular;
    font-size: $font-size-xs;
    color: $color-text-light;
    letter-spacing: 3px;
    text-transform: uppercase;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-sm;
      letter-spacing: 4px;
    }
  }

  &__header-subtitle {
    font-family: $font-primary;
    font-weight: $font-weight-regular;
    font-size: $font-size-xs;
    color: $color-text-light;
    letter-spacing: 3px;
    text-transform: uppercase;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-sm;
      letter-spacing: 4px;
    }
  }

  &__content {
    @include flex-column-center;
    gap: $spacing-2xl;
    max-width: 800px;
    width: 100%;
    text-align: center;
    flex: 1;
    justify-content: center;
    padding: 0 $spacing-sm;

    @media (min-width: $breakpoint-md) {
      gap: $spacing-3xl;
      padding: 0;
    }
  }

  &__title {
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 1.5rem;
    color: $color-text-light;
    margin: 0;
    letter-spacing: 0.5px;

    @media (min-width: $breakpoint-sm) {
      font-size: 1.75rem;
    }

    @media (min-width: $breakpoint-md) {
      font-size: 2.25rem;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: 2.75rem;
    }
  }

  &__answers {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: $spacing-sm;
    width: 100%;
    max-width: 700px;

    @media (min-width: $breakpoint-sm) {
      flex-wrap: nowrap;
      gap: $spacing-lg;
    }

    @media (min-width: $breakpoint-md) {
      gap: $spacing-xl;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
