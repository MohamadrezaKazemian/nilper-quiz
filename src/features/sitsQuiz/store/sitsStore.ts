import { create } from "zustand";
import { SelectedSitsStoreState } from "../interfaces/store";

const useSelectedSitsStore = create<SelectedSitsStoreState>()((set) => ({
  selectedSits: [],
  setSelectedSits: (result: string[]) => set({ selectedSits: result }),
}));

export default useSelectedSitsStore;
