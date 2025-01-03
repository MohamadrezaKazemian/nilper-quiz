import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { TextQuizStoreState } from "../interfaces/store";

// Create the Zustand store with persistence
const useTextQuizStore = create<TextQuizStoreState>()(
  persist(
    (set) => ({
      textQuizResult: {},
      setTextQuizResult: (result: object) => set({ textQuizResult: result }),
    }),
    {
      name: "text-quiz-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Wrap localStorage with JSON storage
    },
  ),
);

export default useTextQuizStore;
