<script setup lang="ts"></script>

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
      <p class="loading-screen__text">We're running to get your results.</p>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./styles/LoadingScreen.scss"></style>
