<script setup lang="ts">
import ProductCard from "@/components/molecules/ProductCard.vue";
import type { Shoe } from "@/types/quiz";
import { computed } from "vue";

interface Props {
  topShoes: Shoe[];
}

const props = defineProps<Props>();
defineEmits<{
  (e: "restart"): void;
}>();

// Split top shoes into main recommendation and similar profiles
const mainShoe = computed(() => props.topShoes[0]);
const similarShoes = computed(() => props.topShoes.slice(1));
</script>

<template>
  <div class="results-screen">
    <div class="results-screen__content">
      <!-- Header Section -->
      <div class="results-screen__header">
        <h1 class="results-screen__title">Congratulations!</h1>
        <p class="results-screen__subtitle">
          Based on your selection we've decided on the {{ mainShoe?.name }}!
          Enjoy the 30 day trial!
        </p>
      </div>

      <!-- Main Recommendation -->
      <div class="results-screen__main" v-if="mainShoe">
        <ProductCard :shoe="mainShoe" :style="{ animationDelay: '0s' }" />
        <button class="results-screen__shop-btn">Shop now</button>
      </div>

      <!-- Similar Profiles Section -->
      <div class="results-screen__similar" v-if="similarShoes.length > 0">
        <h2 class="results-screen__section-title">Similar profiles</h2>
        <div
          class="results-screen__similar-item"
          v-for="(shoe, index) in similarShoes"
          :key="shoe.id"
        >
          <ProductCard
            :shoe="shoe"
            :style="{ animationDelay: `${(index + 1) * 0.15}s` }"
          />
          <button class="results-screen__shop-btn">Shop now</button>
        </div>
      </div>

      <!-- Restart Quiz -->
      <div class="results-screen__restart">
        <button class="results-screen__restart-btn" @click="$emit('restart')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          Restart Quiz
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

.results-screen {
  min-height: calc(100vh - 86px);
  padding: 100px $spacing-md $spacing-3xl;
  background-color: rgb(255, 255, 255);
  animation: fadeIn $transition-normal forwards;

  @media (min-width: $breakpoint-md) {
    padding: 120px $spacing-xl $spacing-3xl;
  }

  &__content {
    max-width: 400px;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      max-width: 320px;
    }
  }

  &__header {
    margin-bottom: $spacing-xl;
  }

  &__title {
    font-family: $font-primary;
    font-weight: $font-weight-regular;
    font-size: 1.75rem;
    color: rgb(70, 98, 113);
    margin: 0 0 $spacing-sm;

    @media (min-width: $breakpoint-md) {
      font-size: 2rem;
    }
  }

  &__subtitle {
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 0.875rem;
    color: rgb(102, 102, 102);
    line-height: 1.5;
    margin: 0;
  }

  &__main {
    margin-bottom: $spacing-2xl;
  }

  &__shop-btn {
    display: block;
    width: 220px;
    margin: $spacing-lg auto 0;
    padding: $spacing-md $spacing-xl;
    background-color: rgb(70, 98, 113);
    color: white;
    font-family: $font-primary;
    font-weight: $font-weight-medium;
    font-size: 0.875rem;
    letter-spacing: 1px;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgb(55, 80, 95);
    }
  }

  &__similar {
    margin-top: $spacing-2xl;
  }

  &__section-title {
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 1.25rem;
    color: rgb(51, 51, 51);
    margin: 0 0 $spacing-lg;
    font-style: italic;
  }

  &__similar-item {
    margin-bottom: $spacing-xl;
  }

  &__restart {
    text-align: center;
    margin-top: $spacing-lg;
  }

  &__restart-btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-xs;
    background: none;
    border: none;
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 0.875rem;
    color: rgb(102, 102, 102);
    cursor: pointer;
    text-decoration: underline;
    padding: $spacing-sm;

    &:hover {
      color: rgb(51, 51, 51);
    }

    svg {
      width: 14px;
      height: 14px;
    }
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
