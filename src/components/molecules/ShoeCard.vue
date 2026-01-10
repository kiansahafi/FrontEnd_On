<script setup lang="ts">
import BaseText from "@/components/atoms/BaseText.vue";
import BaseImage from "@/components/atoms/BaseImage.vue";
import type { Shoe } from "@/types/quiz";

interface Props {
  shoe: Shoe;
  rank: number;
}

defineProps<Props>();

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

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.shoe-card {
  display: flex;
  align-items: center;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background-color: $color-secondary;
  border: 1px solid $color-gray-medium;
  transition: all $transition-normal;
  animation: fadeInUp $transition-slow forwards;

  &--winner {
    border-color: $color-primary;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  &__rank {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }

  &__image {
    width: 150px;
    height: 100px;
    flex-shrink: 0;

    @media (max-width: $breakpoint-md) {
      width: 100px;
      height: 70px;
    }
  }

  &__info {
    flex: 1;
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
