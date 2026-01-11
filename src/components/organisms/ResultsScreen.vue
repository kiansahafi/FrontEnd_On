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

const mainShoe = computed(() => props.topShoes[0]);
const similarShoes = computed(() => props.topShoes.slice(1));
</script>

<template>
  <div class="results-screen">
    <div class="results-screen__content">
      <div class="results-screen__header">
        <h1 class="results-screen__title">Congratulations!</h1>
        <p class="results-screen__subtitle">
          Based on your selection we've decided on the {{ mainShoe?.name }}!
          Enjoy the 30 day trial!
        </p>
      </div>

      <div class="results-screen__main" v-if="mainShoe">
        <ProductCard :shoe="mainShoe" :style="{ animationDelay: '0s' }" />
        <button class="results-screen__shop-btn">Shop now</button>
      </div>

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

<style scoped lang="scss" src="./styles/ResultsScreen.scss"></style>
