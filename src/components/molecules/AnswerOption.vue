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

<style scoped lang="scss" src="./styles/AnswerOption.scss"></style>
