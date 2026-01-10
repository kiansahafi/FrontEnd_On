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
      </div>
    </div>

    <!-- White gradient overlay from bottom -->
    <div class="start-screen__gradient-overlay"></div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.start-screen {
  min-height: calc(100vh - 86px);
  padding-top: 86px;
  background-color: $color-bg-page;
  position: relative;
  overflow: hidden;
  animation: fadeIn $transition-slow forwards;

  &__content {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 86px);
    padding: $spacing-2xl $spacing-xl;
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      align-items: center;
      padding: $spacing-3xl;
    }

    @media (min-width: $breakpoint-lg) {
      max-width: 1400px;
      margin: 0 auto;
      padding: $spacing-3xl $spacing-2xl;
    }
  }

  &__text-section {
    flex: 1;
    z-index: 3;
    padding-bottom: $spacing-2xl;

    @media (min-width: $breakpoint-md) {
      padding-bottom: 0;
      max-width: 50%;
    }
  }

  &__title {
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 2.5rem;
    line-height: 1.2;
    color: $color-text-dark;
    margin: 0 0 $spacing-xl;
    letter-spacing: -0.5px;

    @media (min-width: $breakpoint-sm) {
      font-size: 3rem;
    }

    @media (min-width: $breakpoint-md) {
      font-size: 3.5rem;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: 4rem;
    }
  }

  &__title-line {
    display: block;
  }

  &__button {
    margin-bottom: $spacing-lg;
  }

  &__subtitle {
    font-family: $font-secondary;
    font-size: $font-size-sm;
    color: $color-gray-dark;
    margin: 0;
    letter-spacing: 0.5px;
  }

  &__image-section {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    min-height: 400px;

    @media (min-width: $breakpoint-md) {
      min-height: auto;
      justify-content: flex-end;
      align-items: center;
    }
  }

  &__runner-image {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    position: relative;
    z-index: 2;

    @media (min-width: $breakpoint-md) {
      max-height: 80vh;
      max-width: 90%;
    }

    @media (min-width: $breakpoint-lg) {
      max-height: 85vh;
    }
  }

  &__gradient-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 30%;
    background: linear-gradient(
      to top,
      rgba(247, 247, 247, 1) 0%,
      rgba(247, 247, 247, 0.8) 30%,
      rgba(247, 247, 247, 0) 100%
    );
    z-index: 1;
    pointer-events: none;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
