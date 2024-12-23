import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define the shape of the store's state
interface TextQuizStoreState {
  textQuizResult: any;
  setTextQuizResult: (result: object) => void;
}

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
