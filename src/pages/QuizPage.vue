<script setup lang="ts">
import { useQuizStore } from "@/store/quiz";
import QuizTemplate from "@/components/templates/QuizTemplate.vue";
import StartScreen from "@/components/organisms/StartScreen.vue";
import QuizQuestion from "@/components/organisms/QuizQuestion.vue";
import LoadingScreen from "@/components/organisms/LoadingScreen.vue";
import ResultsScreen from "@/components/organisms/ResultsScreen.vue";

const quizStore = useQuizStore();
</script>

<template>
  <QuizTemplate :state="quizStore.state">
    <Transition name="fade" mode="out-in">
      <StartScreen
        v-if="quizStore.state === 'start'"
        @start="quizStore.startQuiz"
      />

      <QuizQuestion
        v-else-if="quizStore.state === 'question' && quizStore.currentQuestion"
        :key="quizStore.currentQuestionIndex"
        :question="quizStore.currentQuestion"
        :current-index="quizStore.currentQuestionIndex"
        :total-questions="quizStore.totalQuestions"
        :progress="quizStore.progress"
        @answer="quizStore.answerQuestion"
      />

      <LoadingScreen v-else-if="quizStore.state === 'loading'" />

      <ResultsScreen
        v-else-if="quizStore.state === 'results'"
        :top-shoes="quizStore.topShoes"
        @restart="quizStore.restartQuiz"
      />
    </Transition>
  </QuizTemplate>
</template>

<style scoped lang="scss" src="./styles/QuizPage.scss"></style>
