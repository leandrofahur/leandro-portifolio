import { create } from "zustand";

interface UniverseState{
  showStars: boolean;
  toggleStars: () => void;
}

export const useUniverseStore = create<UniverseState>((set) => ({
  showStars: true,
  toggleStars: () => set((state) => ({ showStars: !state.showStars })),
}));