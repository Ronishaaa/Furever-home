import { create } from "zustand";

type Filter = {
  category: string;
  name: string;
};

interface FiltersButtonStore {
  filters: Filter[];
  setFilter: (category: string, name: string) => void;
  removeFilter: (category: string, name: string) => void;
  clearAllFilters: () => void;
}

const usePetFiltersButton = create<FiltersButtonStore>((set) => ({
  filters: [],

  setFilter: (category, name) =>
    set((state) => {
      const alreadyExists = state.filters.some(
        (f) => f.category === category && f.name === name
      );
      if (alreadyExists) return state;
      return {
        filters: [...state.filters, { category, name }],
      };
    }),

  removeFilter: (category, name) =>
    set((state) => ({
      filters: state.filters.filter(
        (filter) => filter.category !== category || filter.name !== name
      ),
    })),

  clearAllFilters: () => set({ filters: [] }),
}));

export default usePetFiltersButton;
