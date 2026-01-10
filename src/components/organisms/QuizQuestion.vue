<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
import AnswerOption from "@/components/molecules/AnswerOption.vue";
import QuestionProgress from "@/components/molecules/QuestionProgress.vue";
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
      <QuestionProgress
        :current="currentIndex"
        :total="totalQuestions"
        :progress="progress"
      />
    </div>

    <div class="quiz-question__content">
      <BaseText
        tag="h2"
        variant="heading"
        color="light"
        class="quiz-question__title"
      >
        {{ question.copy }}
      </BaseText>

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
  padding: 120px $spacing-xl $spacing-xl;
  animation: fadeIn $transition-normal forwards;

  &__header {
    position: fixed;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 400px;
    padding: 0 $spacing-md;
    z-index: 10;
  }

  &__content {
    @include flex-column-center;
    gap: $spacing-2xl;
    max-width: 600px;
    width: 100%;
    text-align: center;
  }

  &__title {
    margin-bottom: $spacing-lg;
  }

  &__answers {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    width: 100%;
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
