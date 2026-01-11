import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useQuizStore } from "@/store/quiz";
import type { Answer } from "@/types/quiz";

describe("Quiz Store - Shoe Scoring Logic", () => {
  beforeEach(() => {
    // Create a fresh pinia instance for each test
    setActivePinia(createPinia());
  });

  describe("Initial State", () => {
    it("should initialize all shoes with rating of 0", () => {
      const store = useQuizStore();

      expect(store.shoes).toBeDefined();
      expect(store.shoes.length).toBeGreaterThan(0);

      store.shoes.forEach((shoe) => {
        expect(shoe.rating).toBe(0);
      });
    });

    it("should have all expected shoe types", () => {
      const store = useQuizStore();
      const expectedShoes = [
        "cloud",
        "cloudx",
        "cloudflow",
        "cloudventure",
        "cloudsurfer",
        "cloudventure_waterproof",
        "cloudventure_peak",
        "cloudflyer",
      ];

      const shoeIds = store.shoes.map((shoe) => shoe.id);
      expectedShoes.forEach((expectedId) => {
        expect(shoeIds).toContain(expectedId);
      });
    });
  });

  describe("Score Calculation", () => {
    it("should correctly increase shoe ratings based on single answer", () => {
      const store = useQuizStore();
      store.startQuiz();

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 5,
          cloudx: 3,
          cloudflow: 2,
          cloudventure: 1,
          cloudsurfer: 4,
          cloudventure_waterproof: 0,
          cloudventure_peak: 0,
          cloudflyer: 2,
        },
      };

      store.answerQuestion(mockAnswer);

      expect(store.shoes.find((s) => s.id === "cloud")?.rating).toBe(5);
      expect(store.shoes.find((s) => s.id === "cloudx")?.rating).toBe(3);
      expect(store.shoes.find((s) => s.id === "cloudflow")?.rating).toBe(2);
      expect(store.shoes.find((s) => s.id === "cloudventure")?.rating).toBe(1);
      expect(store.shoes.find((s) => s.id === "cloudsurfer")?.rating).toBe(4);
      expect(
        store.shoes.find((s) => s.id === "cloudventure_waterproof")?.rating
      ).toBe(0);
      expect(
        store.shoes.find((s) => s.id === "cloudventure_peak")?.rating
      ).toBe(0);
      expect(store.shoes.find((s) => s.id === "cloudflyer")?.rating).toBe(2);
    });

    it("should accumulate ratings across multiple answers", () => {
      const store = useQuizStore();
      store.startQuiz();

      const firstAnswer: Answer = {
        copy: "First Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 5,
          cloudx: 3,
          cloudflow: 2,
          cloudventure: 1,
          cloudsurfer: 4,
          cloudventure_waterproof: 0,
          cloudventure_peak: 0,
          cloudflyer: 2,
        },
      };

      const secondAnswer: Answer = {
        copy: "Second Answer",
        nextQuestion: 2,
        ratingIncrease: {
          cloud: 3,
          cloudx: 2,
          cloudflow: 1,
          cloudventure: 0,
          cloudsurfer: 2,
          cloudventure_waterproof: 5,
          cloudventure_peak: 4,
          cloudflyer: 1,
        },
      };

      store.answerQuestion(firstAnswer);
      store.answerQuestion(secondAnswer);

      // Cloud: 5 + 3 = 8
      expect(store.shoes.find((s) => s.id === "cloud")?.rating).toBe(8);
      // CloudX: 3 + 2 = 5
      expect(store.shoes.find((s) => s.id === "cloudx")?.rating).toBe(5);
      // Cloudflow: 2 + 1 = 3
      expect(store.shoes.find((s) => s.id === "cloudflow")?.rating).toBe(3);
      // Cloudventure: 1 + 0 = 1
      expect(store.shoes.find((s) => s.id === "cloudventure")?.rating).toBe(1);
      // Cloudsurfer: 4 + 2 = 6
      expect(store.shoes.find((s) => s.id === "cloudsurfer")?.rating).toBe(6);
      // Cloudventure Waterproof: 0 + 5 = 5
      expect(
        store.shoes.find((s) => s.id === "cloudventure_waterproof")?.rating
      ).toBe(5);
      // Cloudventure Peak: 0 + 4 = 4
      expect(
        store.shoes.find((s) => s.id === "cloudventure_peak")?.rating
      ).toBe(4);
      // Cloudflyer: 2 + 1 = 3
      expect(store.shoes.find((s) => s.id === "cloudflyer")?.rating).toBe(3);
    });

    it("should handle zero rating increases correctly", () => {
      const store = useQuizStore();
      store.startQuiz();

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 0,
          cloudx: 0,
          cloudflow: 0,
          cloudventure: 0,
          cloudsurfer: 0,
          cloudventure_waterproof: 0,
          cloudventure_peak: 0,
          cloudflyer: 0,
        },
      };

      store.answerQuestion(mockAnswer);

      store.shoes.forEach((shoe) => {
        expect(shoe.rating).toBe(0);
      });
    });

    it("should handle large rating increases", () => {
      const store = useQuizStore();
      store.startQuiz();

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 100,
          cloudx: 50,
          cloudflow: 75,
          cloudventure: 25,
          cloudsurfer: 80,
          cloudventure_waterproof: 60,
          cloudventure_peak: 40,
          cloudflyer: 90,
        },
      };

      store.answerQuestion(mockAnswer);

      expect(store.shoes.find((s) => s.id === "cloud")?.rating).toBe(100);
      expect(store.shoes.find((s) => s.id === "cloudx")?.rating).toBe(50);
      expect(store.shoes.find((s) => s.id === "cloudflow")?.rating).toBe(75);
    });
  });

  describe("Top Shoes Calculation", () => {
    it("should return top 3 shoes sorted by rating", () => {
      const store = useQuizStore();
      store.startQuiz();

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 10,
          cloudx: 50,
          cloudflow: 30,
          cloudventure: 5,
          cloudsurfer: 40,
          cloudventure_waterproof: 20,
          cloudventure_peak: 15,
          cloudflyer: 25,
        },
      };

      store.answerQuestion(mockAnswer);

      const topShoes = store.topShoes;

      expect(topShoes).toHaveLength(3);
      expect(topShoes[0]!.id).toBe("cloudx"); // 50
      expect(topShoes[0]!.rating).toBe(50);
      expect(topShoes[1]!.id).toBe("cloudsurfer"); // 40
      expect(topShoes[1]!.rating).toBe(40);
      expect(topShoes[2]!.id).toBe("cloudflow"); // 30
      expect(topShoes[2]!.rating).toBe(30);
    });

    it("should update top shoes after multiple answers", () => {
      const store = useQuizStore();
      store.startQuiz();

      // First answer - Cloud X leads
      const firstAnswer: Answer = {
        copy: "First Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 5,
          cloudx: 30,
          cloudflow: 10,
          cloudventure: 5,
          cloudsurfer: 15,
          cloudventure_waterproof: 8,
          cloudventure_peak: 3,
          cloudflyer: 7,
        },
      };

      store.answerQuestion(firstAnswer);
      let topShoes = store.topShoes;
      expect(topShoes[0]!.id).toBe("cloudx");

      // Second answer - Cloud takes the lead
      const secondAnswer: Answer = {
        copy: "Second Answer",
        nextQuestion: 2,
        ratingIncrease: {
          cloud: 40,
          cloudx: 5,
          cloudflow: 10,
          cloudventure: 0,
          cloudsurfer: 10,
          cloudventure_waterproof: 0,
          cloudventure_peak: 0,
          cloudflyer: 0,
        },
      };

      store.answerQuestion(secondAnswer);
      topShoes = store.topShoes;

      // Cloud: 5 + 40 = 45
      // CloudX: 30 + 5 = 35
      // Cloudsurfer: 15 + 10 = 25
      expect(topShoes[0]!.id).toBe("cloud");
      expect(topShoes[0]!.rating).toBe(45);
      expect(topShoes[1]!.id).toBe("cloudx");
      expect(topShoes[1]!.rating).toBe(35);
    });

    it("should handle ties in ratings", () => {
      const store = useQuizStore();
      store.startQuiz();

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 20,
          cloudx: 20,
          cloudflow: 20,
          cloudventure: 10,
          cloudsurfer: 10,
          cloudventure_waterproof: 10,
          cloudventure_peak: 5,
          cloudflyer: 5,
        },
      };

      store.answerQuestion(mockAnswer);

      const topShoes = store.topShoes;

      expect(topShoes).toHaveLength(3);
      // All top 3 should have rating of 20
      topShoes.forEach((shoe) => {
        expect(shoe.rating).toBeGreaterThanOrEqual(10);
      });
    });
  });

  describe("Quiz State Management", () => {
    it("should track answered questions correctly", () => {
      const store = useQuizStore();
      store.startQuiz();

      expect(store.answeredQuestions).toHaveLength(0);

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 5,
          cloudx: 3,
          cloudflow: 2,
          cloudventure: 1,
          cloudsurfer: 4,
          cloudventure_waterproof: 0,
          cloudventure_peak: 0,
          cloudflyer: 2,
        },
      };

      store.answerQuestion(mockAnswer);

      expect(store.answeredQuestions).toHaveLength(1);
      expect(store.answeredQuestions[0]).toBe(0);
    });

    it("should reset ratings when restarting quiz", () => {
      const store = useQuizStore();
      store.startQuiz();

      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 10,
          cloudx: 20,
          cloudflow: 30,
          cloudventure: 40,
          cloudsurfer: 50,
          cloudventure_waterproof: 60,
          cloudventure_peak: 70,
          cloudflyer: 80,
        },
      };

      store.answerQuestion(mockAnswer);

      // Verify ratings are not zero
      expect(store.shoes.find((s) => s.id === "cloud")?.rating).toBe(10);

      // Restart quiz
      store.restartQuiz();

      // All ratings should be reset to 0
      store.shoes.forEach((shoe) => {
        expect(shoe.rating).toBe(0);
      });
      expect(store.answeredQuestions).toHaveLength(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle partial rating increase objects", () => {
      const store = useQuizStore();
      store.startQuiz();

      // Only some shoes get rating increases
      const mockAnswer: Answer = {
        copy: "Test Answer",
        nextQuestion: 1,
        ratingIncrease: {
          cloud: 10,
          cloudx: 0,
          cloudflow: 0,
          cloudventure: 0,
          cloudsurfer: 0,
          cloudventure_waterproof: 0,
          cloudventure_peak: 0,
          cloudflyer: 5,
        },
      };

      store.answerQuestion(mockAnswer);

      expect(store.shoes.find((s) => s.id === "cloud")?.rating).toBe(10);
      expect(store.shoes.find((s) => s.id === "cloudx")?.rating).toBe(0);
      expect(store.shoes.find((s) => s.id === "cloudflyer")?.rating).toBe(5);
    });

    it("should maintain correct scores through a complete quiz flow", () => {
      const store = useQuizStore();
      store.startQuiz();

      // Simulate a complete quiz with 3 questions
      const answers: Answer[] = [
        {
          copy: "Answer 1",
          nextQuestion: 1,
          ratingIncrease: {
            cloud: 5,
            cloudx: 4,
            cloudflow: 3,
            cloudventure: 1,
            cloudsurfer: 3,
            cloudventure_waterproof: 3,
            cloudventure_peak: 1,
            cloudflyer: 3,
          },
        },
        {
          copy: "Answer 2",
          nextQuestion: 2,
          ratingIncrease: {
            cloud: 5,
            cloudx: 4,
            cloudflow: 5,
            cloudventure: 1,
            cloudsurfer: 3,
            cloudventure_waterproof: 4,
            cloudventure_peak: 1,
            cloudflyer: 3,
          },
        },
        {
          copy: "Answer 3",
          nextQuestion: "",
          ratingIncrease: {
            cloud: 3,
            cloudx: 2,
            cloudflow: 4,
            cloudventure: 5,
            cloudsurfer: 1,
            cloudventure_waterproof: 2,
            cloudventure_peak: 3,
            cloudflyer: 2,
          },
        },
      ];

      answers.forEach((answer) => {
        store.answerQuestion(answer);
      });

      // Cloud: 5 + 5 + 3 = 13
      expect(store.shoes.find((s) => s.id === "cloud")?.rating).toBe(13);
      // CloudX: 4 + 4 + 2 = 10
      expect(store.shoes.find((s) => s.id === "cloudx")?.rating).toBe(10);
      // Cloudflow: 3 + 5 + 4 = 12
      expect(store.shoes.find((s) => s.id === "cloudflow")?.rating).toBe(12);
      // Cloudventure: 1 + 1 + 5 = 7
      expect(store.shoes.find((s) => s.id === "cloudventure")?.rating).toBe(7);
      // Cloudsurfer: 3 + 3 + 1 = 7
      expect(store.shoes.find((s) => s.id === "cloudsurfer")?.rating).toBe(7);

      expect(store.answeredQuestions).toHaveLength(3);
    });
  });
});
