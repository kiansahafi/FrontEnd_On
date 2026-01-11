import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Shoe, Question, Answer, QuizState, QuizData } from "@/types/quiz";
import quizData from "../../data.json";

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
    shoes.value = data.shoes.map((shoe) => ({
      ...shoe,
      rating: 0,
      description: "Premium running shoe designed for performance.",
      price: "200 CHF",
      colors: [
        { name: "Neon & Grey", hex: ["#d4ff00", "#c4c4a0"] },
        { name: "Red & Black", hex: ["#8b0000", "#1a1a1a"] },
        { name: "Navy Blue", hex: ["#1a3a5c", "#4a90e2"] },
        { name: "Midnight", hex: ["#2c3e50", "#34495e"] },
        { name: "Black", hex: ["#1a1a1a", "#333333"] },
      ],
    }));
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
