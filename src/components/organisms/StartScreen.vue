<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";

defineEmits<{
  (e: "start"): void;
}>();
</script>

<template>
  <div class="start-screen">
    <div class="start-screen__content">
      <BaseText tag="h1" variant="heading" color="light" uppercase>
        Find Your Perfect
      </BaseText>
      <BaseText tag="h1" variant="heading" color="light" uppercase>
        Running Shoe
      </BaseText>
      <div class="start-screen__divider"></div>
      <BaseText
        tag="p"
        variant="body"
        color="light"
        class="start-screen__description"
      >
        Answer a few questions and we'll help you find the perfect shoe for your
        running style.
      </BaseText>
      <BaseButton variant="outline" size="large" @click="$emit('start')">
        Start Quiz
      </BaseButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.start-screen {
  @include flex-column-center;
  justify-content: center;
  min-height: 100vh;
  padding: $spacing-xl;
  text-align: center;
  animation: fadeIn $transition-slow forwards;

  &__content {
    @include flex-column-center;
    gap: $spacing-md;
    max-width: 600px;
  }

  &__divider {
    width: 60px;
    height: 2px;
    background-color: $color-secondary;
    margin: $spacing-lg 0;
  }

  &__description {
    margin-bottom: $spacing-xl;
    opacity: 0.9;
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
