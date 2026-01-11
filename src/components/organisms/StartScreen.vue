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

        <!-- Gradient overlay that actually sits ON TOP of the runner -->
        <div class="start-screen__gradient-overlay" aria-hidden="true"></div>
      </div>
    </div>
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
    padding: $spacing-xl $spacing-lg;

    /* key: allow absolutely-positioned runner on mobile */
    position: relative;
    z-index: 2;

    justify-content: center;

    /* key: reserve space so runner can overlap upward without forcing big gaps */
    padding-bottom: clamp(120px, 18vh, 220px);

    @media (min-width: $breakpoint-sm) {
      padding: $spacing-2xl $spacing-xl;
      padding-bottom: clamp(140px, 18vh, 260px);
    }

    @media (min-width: $breakpoint-md) {
      flex-direction: row;
      align-items: center;
      padding: $spacing-3xl;
      justify-content: flex-start;

      /* reset mobile reserve on desktop layout */
      padding-bottom: $spacing-3xl;
    }

    @media (min-width: $breakpoint-lg) {
      max-width: 1400px;
      margin: 0 auto;
      padding: $spacing-3xl $spacing-2xl;
      padding-bottom: $spacing-3xl;
    }
  }

  &__text-section {
    flex: 0 0 auto;
    z-index: 3;
    padding-bottom: clamp(5rem, 14vh, 9rem);

    @media (min-width: $breakpoint-sm) {
      padding-bottom: $spacing-lg;
    }

    @media (min-width: $breakpoint-md) {
      flex: 1;
      padding-bottom: 0;
      max-width: 50%;
    }
  }

  &__title {
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 1.75rem;
    line-height: 1.2;
    color: $color-text-dark;
    margin: 0 0 $spacing-lg;
    letter-spacing: -0.5px;

    @media (min-width: $breakpoint-sm) {
      font-size: 2.25rem;
      margin: 0 0 $spacing-xl;
    }

    @media (min-width: $breakpoint-md) {
      font-size: 3rem;
    }

    @media (min-width: $breakpoint-lg) {
      font-size: 4rem;
    }
  }

  &__title-line {
    display: block;
  }

  &__button {
    margin-bottom: $spacing-md;

    @media (min-width: $breakpoint-sm) {
      margin-bottom: $spacing-lg;
    }
  }

  &__subtitle {
    font-family: $font-secondary;
    font-size: $font-size-xs;
    color: $color-gray-dark;
    margin: 0;
    letter-spacing: 0.5px;

    @media (min-width: $breakpoint-sm) {
      font-size: $font-size-sm;
    }
  }

  &__image-section {
    // MOBILE
    position: absolute;
    left: 0;
    right: -5.5rem;
    bottom: calc(env(safe-area-inset-bottom) + 8px);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    // keep it behind the text
    z-index: 1;

    // don’t block clicks on button
    pointer-events: none;

    @media (min-width: $breakpoint-sm) {
      right: -$spacing-xl;
    }

    // DESKTOP/TABLET: go back to normal flex layout
    @media (min-width: $breakpoint-md) {
      position: relative;
      left: auto;
      right: auto;
      bottom: auto;

      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      pointer-events: auto;
      z-index: 2;
    }
  }

  &__runner-image {
    max-width: 110%;
    object-fit: contain;
    position: relative;
    z-index: 1;

    /* key: make it tall enough so it reaches up toward the button */
    max-height: clamp(540px, 78vh, 920px);

    @media (min-width: $breakpoint-md) {
      max-height: 80vh;
      max-width: 90%;
    }

    @media (min-width: $breakpoint-lg) {
      max-height: 85vh;
    }
  }

  &__gradient-overlay {
    /* gradient must be inside the image section to overlay the runner */
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    height: clamp(110px, 18vh, 220px);
    pointer-events: none;
    z-index: 2;

    /* key: use the page background color so it’s actually visible */
    background: linear-gradient(
      to top,
      rgba($color-bg-page, 1) 0%,
      rgba($color-bg-page, 1) 35%,
      rgba($color-bg-page, 0.35) 70%,
      rgba($color-bg-page, 0) 100%
    );
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
