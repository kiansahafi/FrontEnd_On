<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
</script>

<template>
  <div class="loading-screen">
    <div class="loading-screen__content">
      <div class="loading-screen__loader">
        <img
          src="@/assets/loader.gif"
          alt="Loading"
          class="loading-screen__gif"
        />
      </div>
      <BaseText tag="h2" variant="subheading" color="light" uppercase>
        Finding Your Perfect Shoe
      </BaseText>
      <BaseText
        tag="p"
        variant="body"
        color="light"
        class="loading-screen__message"
      >
        Analyzing your preferences...
      </BaseText>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.loading-screen {
  @include flex-column-center;
  justify-content: center;
  min-height: calc(100vh - 86px);
  padding: 86px $spacing-xl $spacing-xl;
  text-align: center;
  animation: fadeIn $transition-normal forwards;

  &__content {
    @include flex-column-center;
    gap: $spacing-lg;
  }

  &__loader {
    width: 120px;
    height: 120px;
    margin-bottom: $spacing-xl;
  }

  &__gif {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &__message {
    opacity: 0.8;
    animation: pulse 1.5s ease-in-out infinite;
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

@keyframes pulse {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
