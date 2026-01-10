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

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.quiz-template {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: $color-bg-page;

  &__background {
    @include full-screen-bg;
    z-index: 0;
    transition: background-color $transition-slow;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  // State-specific backgrounds
  &--start {
    .quiz-template__background {
      background-color: $color-bg-page;
    }
  }

  &--question {
    .quiz-template__background {
      background-color: rgb(51, 51, 51);
    }
  }

  &--loading {
    .quiz-template__background {
      background-color: rgb(51, 51, 51);
    }
  }

  &--results {
    .quiz-template__background {
      background-color: $color-bg-page;
    }
  }
}
</style>
