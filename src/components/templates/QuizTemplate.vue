<script setup lang="ts">
import type { QuizState } from "@/types/quiz";
import AppHeader from "@/components/molecules/AppHeader.vue";

interface Props {
  state: QuizState;
}

defineProps<Props>();
</script>

<template>
  <div class="quiz-template" :class="`quiz-template--${state}`">
    <AppHeader />
    <div class="quiz-template__background"></div>
    <div class="quiz-template__content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles/QuizTemplate.scss"></style>
