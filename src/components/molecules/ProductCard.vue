<script setup lang="ts">
import { ref } from "vue";
import type { Shoe, ShoeColor } from "@/types/quiz";

interface Props {
  shoe: Shoe;
}

const props = defineProps<Props>();

// Track selected color
const selectedColorIndex = ref(0);

const selectedColor = () => props.shoe.colors[selectedColorIndex.value];

const selectColor = (index: number) => {
  selectedColorIndex.value = index;
};

// Map shoe IDs to image paths
const getShoeImage = (shoeId: string): string => {
  const imageMap: Record<string, string> = {
    cloud: new URL("@/assets/Cloud.png", import.meta.url).href,
    cloudx: new URL("@/assets/Cloud X.png", import.meta.url).href,
    cloudflow: new URL("@/assets/Cloudflow.png", import.meta.url).href,
    cloudventure: new URL("@/assets/Cloudventure.png", import.meta.url).href,
    cloudsurfer: new URL("@/assets/Cloudsurfer.png", import.meta.url).href,
    cloudventure_waterproof: new URL(
      "@/assets/Cloudventure Waterproof.png",
      import.meta.url
    ).href,
    cloudventure_peak: new URL(
      "@/assets/Cloudventure Peak.png",
      import.meta.url
    ).href,
    cloudflyer: new URL("@/assets/Cloudflyer.png", import.meta.url).href,
  };
  return imageMap[shoeId] || "";
};
</script>

<template>
  <div class="product-card">
    <div class="product-card__image-container">
      <img
        :src="getShoeImage(shoe.id)"
        :alt="shoe.name"
        class="product-card__image"
      />
    </div>
    <div class="product-card__content">
      <h3 class="product-card__name">{{ shoe.name }}</h3>
      <p class="product-card__description">{{ shoe.description }}</p>
      <div class="product-card__price-color">
        <span class="product-card__price">{{ shoe.price }}</span>
        <span class="product-card__divider">|</span>
        <span class="product-card__color-name">{{ selectedColor().name }}</span>
      </div>
      <div class="product-card__colors">
        <button
          v-for="(color, index) in shoe.colors"
          :key="index"
          class="product-card__color-swatch"
          :class="{
            'product-card__color-swatch--selected':
              index === selectedColorIndex,
          }"
          :style="{ backgroundColor: color.hex }"
          :aria-label="`Select ${color.name}`"
          @click="selectColor(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.product-card {
  background-color: rgb(247, 247, 247);
  overflow: hidden;
  animation: fadeInUp 0.5s ease forwards;

  &__image-container {
    width: 100%;
    padding: $spacing-xl $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__image {
    width: 100%;
    max-width: 280px;
    height: auto;
    object-fit: contain;
  }

  &__content {
    padding: $spacing-lg $spacing-xl $spacing-xl;
  }

  &__name {
    font-family: $font-primary;
    font-weight: $font-weight-regular;
    font-size: 1.25rem;
    color: rgb(51, 51, 51);
    margin: 0 0 $spacing-sm;
    letter-spacing: 0.5px;
  }

  &__description {
    font-family: $font-primary;
    font-weight: $font-weight-light;
    font-size: 0.875rem;
    color: rgb(102, 102, 102);
    line-height: 1.5;
    margin: 0 0 $spacing-md;
  }

  &__price-color {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    margin-bottom: $spacing-md;
    font-family: $font-primary;
    font-size: 0.875rem;
  }

  &__price {
    font-weight: $font-weight-medium;
    color: rgb(51, 51, 51);
  }

  &__divider {
    color: rgb(153, 153, 153);
  }

  &__color-name {
    font-weight: $font-weight-light;
    color: rgb(102, 102, 102);
  }

  &__colors {
    display: flex;
    gap: $spacing-xs;
  }

  &__color-swatch {
    width: 24px;
    height: 24px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color 0.2s ease;
    padding: 0;

    &:hover {
      border-color: rgba(0, 0, 0, 0.3);
    }

    &--selected {
      border-color: rgb(51, 51, 51);
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
