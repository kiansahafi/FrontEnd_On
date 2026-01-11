<script setup lang="ts">
import BaseButton from "@/components/atoms/BaseButton.vue";

defineEmits<{
  (e: "start"): void;
}>();
</script>

<template>
  <div class="start-screen">
    <div class="start-screen__content">
      <div class="start-screen__text-section">
        <h1 class="start-screen__title">
          <span class="start-screen__title-line">Take the quiz</span>
          <span class="start-screen__title-line">and try your first pair!</span>
        </h1>

        <BaseButton
          variant="primary"
          size="large"
          @click="$emit('start')"
          class="start-screen__button"
        >
          Try On Trial
        </BaseButton>

        <p class="start-screen__subtitle">30 Days risk free</p>
      </div>

      <div class="start-screen__image-section">
        <img
          src="@/assets/Background Image Start Screen.png"
          alt="Runner"
          class="start-screen__runner-image"
        />

        <div class="start-screen__gradient-overlay" aria-hidden="true"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles/StartScreen.scss"></style>
