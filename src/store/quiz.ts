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
    shoes.value = data.shoes.map((shoe) => ({ ...shoe, rating: 0 }));
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
