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

<style scoped lang="scss" src="./styles/QuizQuestion.scss"></style>
