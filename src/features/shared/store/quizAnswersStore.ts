import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QuizResultStoreState } from "../interfaces/quizResult";
import { Answers } from "@/features/shared/interfaces/sendQuiz";

// Create the Zustand store with persistence
const useQuizAnswersStore = create<QuizResultStoreState>()((set) => ({
  quizAnswers: [], // Initialize as an empty array
  setQuizAnswers: (quizAnswer: Answers) =>
    set((state) => ({
      quizAnswers: [...state.quizAnswers, quizAnswer], // Append the new quiz result to the array
    })),
  deleteLastQuizAnswer: () =>
    set((state) => ({
      quizAnswers: state.quizAnswers.slice(0, state.quizAnswers.length - 1), // Remove the last element of the array
    })),
}));

export default useQuizAnswersStore;
