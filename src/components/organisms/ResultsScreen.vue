<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import ShoeCard from "@/components/molecules/ShoeCard.vue";
import type { Shoe } from "@/types/quiz";

interface Props {
  topShoes: Shoe[];
}

defineProps<Props>();
defineEmits<{
  (e: "restart"): void;
}>();
</script>

<template>
  <div class="results-screen">
    <div class="results-screen__content">
      <div class="results-screen__header">
        <BaseText tag="h1" variant="heading" color="dark" uppercase>
          Your Results
        </BaseText>
        <BaseText
          tag="p"
          variant="body"
          color="gray"
          class="results-screen__subtitle"
        >
          Based on your answers, here are your top shoe recommendations:
        </BaseText>
      </div>

      <div class="results-screen__shoes">
        <ShoeCard
          v-for="(shoe, index) in topShoes"
          :key="shoe.id"
          :shoe="shoe"
          :rank="index + 1"
          :style="{ animationDelay: `${index * 0.15}s` }"
        />
      </div>

      <div class="results-screen__actions">
        <BaseButton variant="primary" size="large" @click="$emit('restart')">
          Take Quiz Again
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.results-screen {
  min-height: 100vh;
  padding: $spacing-3xl $spacing-xl;
  background-color: $color-gray-light;
  animation: fadeIn $transition-normal forwards;

  &__content {
    max-width: 700px;
    margin: 0 auto;
  }

  &__header {
    text-align: center;
    margin-bottom: $spacing-2xl;
  }

  &__subtitle {
    margin-top: $spacing-md;
  }

  &__shoes {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    margin-bottom: $spacing-2xl;
  }

  &__actions {
    text-align: center;
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
