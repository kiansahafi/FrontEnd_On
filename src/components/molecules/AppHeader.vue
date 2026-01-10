<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuizStore } from "@/store/quiz";

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
      <div class="app-header__logo">
        <svg
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="On Logo"
          role="img"
        >
          <path
            d="M36.281 11.384c-.056.058-.114.13-.17.188l-2.364 2.41-.057.058c-.057.072-.057.145.014.247a8.331 8.331 0 0 1 1.096 3.309c.257 2.409-.342 4.571-1.822 6.473-1.268 1.625-2.92 2.64-4.899 3.09-.911.204-1.837.218-2.762.117-1.524-.16-2.891-.726-4.116-1.655-1.766-1.335-2.862-3.105-3.318-5.311-.17-.813-.199-1.64-.128-2.453.171-1.901.883-3.585 2.15-5.022 1.21-1.379 2.692-2.278 4.443-2.685a8.03 8.03 0 0 1 2.635-.189 8.5 8.5 0 0 1 3.588 1.147c.142.087.2.029.285-.058l2.35-2.395c.056-.058.113-.13.185-.217l2.889 2.945.001.001Zm-5.342 7.4c.071-2.8-2.093-4.832-4.529-4.905-2.748-.073-4.798 2.25-4.798 4.76 0 2.57 2.122 4.79 4.67 4.746 2.507.03 4.6-2.076 4.656-4.6Zm3.605 19.391c.014 2.351 0 4.717 0 7.068v.32h-4.13v-.29c0-2.468.015-4.935 0-7.403 0-1.291-.44-2.423-1.366-3.323a3.827 3.827 0 0 0-2.208-1.06c-1.11-.16-2.121.117-3.018.799-.898.696-1.424 1.64-1.595 2.757-.086.537-.1 1.089-.1 1.64-.014 2.192 0 4.369 0 6.56v.305h-4.101v-.276c0-2.656-.029-5.326.014-7.982.029-1.408.47-2.743 1.196-3.962 1.21-2.032 2.934-3.338 5.198-3.875a8.414 8.414 0 0 1 2.178-.203c2.265.101 4.201 1.015 5.74 2.742 1.096 1.248 1.794 2.7 2.036 4.369.098.608.155 1.217.155 1.812"
          ></path>
        </svg>
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
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 998;
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
