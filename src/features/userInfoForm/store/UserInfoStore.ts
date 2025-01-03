import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { FormInputs } from "../interfaces/formInterfaces";

interface UseInfoStoreState {
  userInfo: FormInputs | null;
  setUserInfo: (result: FormInputs) => void;
}

const useUserInfoStore = create<UseInfoStoreState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (result) => set({ userInfo: result }),
    }),
    {
      name: "user-info-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserInfoStore;
