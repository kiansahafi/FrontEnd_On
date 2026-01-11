<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quiz";
import OnLogo from "@/assets/on-logo.svg";

const isMenuOpen = ref(false);
const router = useRouter();
const quizStore = useQuizStore();

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const goToHome = () => {
  quizStore.restartQuiz();
  isMenuOpen.value = false;
};

const goToQuiz = () => {
  quizStore.startQuiz();
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="app-header">
    <div class="app-header__container">
      <button
        class="app-header__menu-btn"
        :class="{ 'app-header__menu-btn--open': isMenuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="app-header__menu-line"></span>
        <span class="app-header__menu-line"></span>
        <span class="app-header__menu-line"></span>
      </button>

      <div class="app-header__logo" @click="goToHome">
        <img :src="OnLogo" alt="On Logo" width="54" height="54" />
      </div>

      <div class="app-header__spacer"></div>
    </div>

    <Transition name="menu-slide">
      <nav v-if="isMenuOpen" class="app-header__nav">
        <ul class="app-header__nav-list">
          <li class="app-header__nav-item">
            <button @click="goToHome" class="app-header__nav-link">Home</button>
          </li>
          <li class="app-header__nav-item">
            <button @click="goToQuiz" class="app-header__nav-link">Quiz</button>
          </li>
        </ul>
      </nav>
    </Transition>

    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="app-header__overlay"
        @click="toggleMenu"
      ></div>
    </Transition>
  </header>
</template>

<style scoped lang="scss" src="./styles/AppHeader.scss"></style>
