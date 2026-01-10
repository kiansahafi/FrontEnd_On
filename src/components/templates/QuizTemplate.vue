<script setup lang="ts">
import type { QuizState } from "@/types/quiz";

interface Props {
  state: QuizState;
}

defineProps<Props>();
</script>

<template>
  <div class="quiz-template" :class="`quiz-template--${state}`">
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

  &__background {
    @include full-screen-bg;
    z-index: -1;
    transition: background-image $transition-slow;
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  // State-specific backgrounds
  &--start {
    .quiz-template__background {
      background-image: url("@/assets/Start Screen.jpg");

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.4) 0%,
          rgba(0, 0, 0, 0.6) 100%
        );
      }
    }
  }

  &--question {
    .quiz-template__background {
      background-image: url("@/assets/Question.jpg");

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.7) 100%
        );
      }
    }
  }

  &--loading {
    .quiz-template__background {
      background-image: url("@/assets/Loading Results.jpg");

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.7) 100%
        );
      }
    }
  }

  &--results {
    .quiz-template__background {
      background-color: $color-gray-light;
    }
  }
}
</style>
