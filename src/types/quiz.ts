// Type definitions for the Quiz application

export interface Shoe {
  id: string;
  name: string;
  rating: number;
}

export interface RatingIncrease {
  cloud: number;
  cloudx: number;
  cloudflow: number;
  cloudventure: number;
  cloudsurfer: number;
  cloudventure_waterproof: number;
  cloudventure_peak: number;
  cloudflyer: number;
  [key: string]: number;
}

export interface Answer {
  id?: number;
  copy: string;
  nextQuestion: number | "";
  ratingIncrease: RatingIncrease;
}

export interface Question {
  id: number;
  copy: string;
  answers: Answer[];
}

export interface QuizData {
  shoes: Shoe[];
  questions: Question[];
}

export type QuizState = "start" | "question" | "loading" | "results";
