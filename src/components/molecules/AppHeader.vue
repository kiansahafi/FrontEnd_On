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
      <!-- Hamburger Menu Button -->
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

      <!-- Logo -->
      <div class="app-header__logo" @click="goToHome">
        <img :src="OnLogo" alt="On Logo" width="54" height="54" />
      </div>

      <!-- Empty div for spacing -->
      <div class="app-header__spacer"></div>
    </div>

    <!-- Dropdown Menu -->
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

    <!-- Overlay -->
    <Transition name="fade">
      <div
        v-if="isMenuOpen"
        class="app-header__overlay"
        @click="toggleMenu"
      ></div>
    </Transition>
  </header>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgb(255, 255, 255);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-md $spacing-lg;
    max-width: 1400px;
    margin: 0 auto;

    @media (min-width: $breakpoint-md) {
      padding: $spacing-lg $spacing-xl;
    }
  }

  &__menu-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 40px;
    height: 40px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;

    &--open {
      .app-header__menu-line {
        &:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        &:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }
      }
    }
  }

  &__menu-line {
    display: block;
    width: 24px;
    height: 2px;
    background-color: $color-primary;
    transition: all $transition-normal;
    transform-origin: center;
  }

  &__logo {
    color: $color-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &__spacer {
    width: 40px;
  }

  &__nav {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    z-index: 999;
  }

  &__nav-list {
    list-style: none;
    margin: 0;
    padding: $spacing-md 0;
  }

  &__nav-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);

    &:last-child {
      border-bottom: none;
    }
  }

  &__nav-link {
    display: block;
    width: 100%;
    padding: $spacing-lg $spacing-xl;
    font-family: $font-primary;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-primary;
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background-color $transition-fast;

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }

  &__overlay {
    position: fixed;
    top: 86px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 998;

    @media (min-width: $breakpoint-md) {
      top: 102px;
    }
  }
}

// Menu slide animation
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all $transition-normal;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// Fade animation for overlay
.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-normal;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
