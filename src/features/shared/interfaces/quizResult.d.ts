import { Answers } from "@/features/shared/interfaces/sendQuiz";

export interface QuizResultStoreState {
  quizAnswers: Answers[];
  setQuizAnswers: (result: Answers) => void;
  deleteLastQuizAnswer: () => void;
}
