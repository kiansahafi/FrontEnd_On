import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  Shoe,
  Question,
  Answer,
  QuizState,
  QuizData,
  ShoeColor,
} from "@/types/quiz";
import quizData from "../../data.json";

// Extended shoe data with descriptions, prices, and colors
const shoeExtendedData: Record<
  string,
  { description: string; price: string; colors: ShoeColor[] }
> = {
  cloud: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "200 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudx: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "200 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudflow: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "200 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudventure: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "200 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudsurfer: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "200 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudventure_waterproof: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "220 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudventure_peak: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "230 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
  cloudflyer: {
    description:
      "Your perfect partner in the world's lightest fully-cushioned shoe for Running Remixed.",
    price: "200 CHF",
    colors: [
      { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
      { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
      { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
      { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
      { name: "Black", hex: ["#1a1a1a", "#333333"] },
    ],
  },
};

export const useQuizStore = defineStore("quiz", () => {
  // State
  const state = ref<QuizState>("start");
  const currentQuestionIndex = ref(0);
  const shoes = ref<Shoe[]>([]);
  const questions = ref<Question[]>([]);
  const answeredQuestions = ref<number[]>([]);

  // Initialize data
  const initializeQuiz = () => {
    const data = quizData as QuizData;
    shoes.value = data.shoes.map((shoe) => {
      const extended = shoeExtendedData[shoe.id] || {
        description: "Premium running shoe designed for performance.",
        price: "200 CHF",
        colors: [{ name: "Black", hex: ["#1a1a1a", "#333333"] }],
      };
      return {
        ...shoe,
        rating: 0,
        description: extended.description,
        price: extended.price,
        colors: extended.colors,
      };
    });
    questions.value = data.questions;
    currentQuestionIndex.value = 0;
    answeredQuestions.value = [];
    state.value = "start";
  };

  // Getters
  const currentQuestion = computed(() => {
    return questions.value.find((q) => q.id === currentQuestionIndex.value);
  });

  const totalQuestions = computed(() => questions.value.length);

  const progress = computed(() => {
    if (answeredQuestions.value.length === 0) return 0;
    return (answeredQuestions.value.length / totalQuestions.value) * 100;
  });

  const topShoes = computed(() => {
    return [...shoes.value].sort((a, b) => b.rating - a.rating).slice(0, 3);
  });

  // Actions
  const startQuiz = () => {
    initializeQuiz();
    state.value = "question";
  };

  const answerQuestion = (answer: Answer) => {
    // Update shoe ratings
    for (const [shoeId, increase] of Object.entries(answer.ratingIncrease)) {
      const shoe = shoes.value.find((s) => s.id === shoeId);
      if (shoe) {
        shoe.rating += increase;
      }
    }

    // Track answered questions
    answeredQuestions.value.push(currentQuestionIndex.value);

    // Check if quiz is complete
    if (answer.nextQuestion === "") {
      state.value = "loading";
      // Simulate loading time
      setTimeout(() => {
        state.value = "results";
      }, 2000);
    } else {
      currentQuestionIndex.value = answer.nextQuestion;
    }
  };

  const restartQuiz = () => {
    initializeQuiz();
  };

  // Initialize on store creation
  initializeQuiz();

  return {
    // State
    state,
    currentQuestionIndex,
    shoes,
    questions,
    answeredQuestions,
    // Getters
    currentQuestion,
    totalQuestions,
    progress,
    topShoes,
    // Actions
    startQuiz,
    answerQuestion,
    restartQuiz,
    initializeQuiz,
  };
});
