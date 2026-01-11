<script setup lang="ts">
import { ref } from "vue";
import type { Shoe, ShoeColor } from "@/types/quiz";

interface Props {
  shoe: Shoe;
}

const props = defineProps<Props>();

const selectedColorIndex = ref(0);

const selectedColor = () => props.shoe.colors[selectedColorIndex.value];

const selectColor = (index: number) => {
  selectedColorIndex.value = index;
};

const getColorStyle = (color: ShoeColor) => {
  if (Array.isArray(color.hex)) {
    return {
      background: `linear-gradient(180deg, ${color.hex[0]} 50%, ${color.hex[1]} 50%)`,
    };
  }
  return {
    backgroundColor: color.hex,
  };
};

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
        <span class="product-card__color-name">{{
          selectedColor()?.name
        }}</span>
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
          :style="getColorStyle(color)"
          :aria-label="`Select ${color.name}`"
          @click="selectColor(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles/ProductCard.scss"></style>
