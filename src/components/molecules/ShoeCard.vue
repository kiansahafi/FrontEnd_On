<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
import BaseImage from "@/components/atoms/BaseImage.vue";
import type { Shoe } from "@/types/quiz";

interface Props {
  shoe: Shoe;
  rank: number;
}

defineProps<Props>();

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
  <div class="shoe-card" :class="{ 'shoe-card--winner': rank === 1 }">
    <div class="shoe-card__rank">
      <BaseText
        tag="span"
        variant="heading"
        :color="rank === 1 ? 'dark' : 'gray'"
      >
        {{ rank }}
      </BaseText>
    </div>
    <div class="shoe-card__image">
      <BaseImage
        :src="getShoeImage(shoe.id)"
        :alt="shoe.name"
        objectFit="contain"
      />
    </div>
    <div class="shoe-card__info">
      <BaseText tag="h3" variant="subheading" color="dark" uppercase>
        {{ shoe.name }}
      </BaseText>
      <BaseText tag="p" variant="caption" color="gray">
        Score: {{ shoe.rating }}
      </BaseText>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles/ShoeCard.scss"></style>
