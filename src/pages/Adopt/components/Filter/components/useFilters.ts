import { create } from "zustand";

interface FiltersStore {
  ageMin: number;
  ageMax: number;
  gender: string;
  energyLevels: string[];
  personality: string[];
  trainingLevels: string[];
  experienceLevels: string[];

  setAgeMin: (age: number) => void;
  setAgeMax: (age: number) => void;
  setGender: (gender: string) => void;
  setEnergyLevels: (level: string) => void;
  setPersonality: (trait: string) => void;
  setTrainingLevels: (level: string) => void;
  setExperienceLevels: (level: string) => void;
  removeFilter: (category: string, value: string) => void;
  clearAll: () => void;
}

const useFilters = create<FiltersStore>((set) => ({
  ageMin: 0,
  ageMax: 20,
  gender: "",
  energyLevels: [],
  personality: [],
  trainingLevels: [],
  experienceLevels: [],

  // Set minimum age
  setAgeMin: (age) => set({ ageMin: age }),

  // Set maximum age
  setAgeMax: (age) => set({ ageMax: age }),

  // Set gender
  setGender: (gender) => set({ gender }),

  // Toggle energy level
  setEnergyLevels: (level) =>
    set((state) => ({
      energyLevels: state.energyLevels.includes(level)
        ? state.energyLevels.filter((item) => item !== level)
        : [...state.energyLevels, level],
    })),

  // Toggle personality trait
  setPersonality: (trait) =>
    set((state) => ({
      personality: state.personality.includes(trait)
        ? state.personality.filter((item) => item !== trait)
        : [...state.personality, trait],
    })),

  // Toggle training level
  setTrainingLevels: (level) =>
    set((state) => ({
      trainingLevels: state.trainingLevels.includes(level)
        ? state.trainingLevels.filter((item) => item !== level)
        : [...state.trainingLevels, level],
    })),

  // Toggle experience level
  setExperienceLevels: (level) =>
    set((state) => ({
      experienceLevels: state.experienceLevels.includes(level)
        ? state.experienceLevels.filter((item) => item !== level)
        : [...state.experienceLevels, level],
    })),

  // Remove a specific filter
  removeFilter: (category, value) =>
    set((state) => {
      switch (category) {
        case "AgeMin":
          return { ageMin: undefined };
        case "AgeMax":
          return { ageMax: undefined };
        case "Gender":
          return { gender: undefined };
        case "EnergyLevels":
          return {
            energyLevels: state.energyLevels.filter((item) => item !== value),
          };
        case "Personality":
          return {
            personality: state.personality.filter((item) => item !== value),
          };
        case "TrainingLevels":
          return {
            trainingLevels: state.trainingLevels.filter(
              (item) => item !== value
            ),
          };
        case "ExperienceLevels":
          return {
            experienceLevels: state.experienceLevels.filter(
              (item) => item !== value
            ),
          };
        default:
          return {};
      }
    }),

  // Clear all filters
  clearAll: () =>
    set({
      ageMin: undefined,
      ageMax: undefined,
      gender: undefined,
      energyLevels: [],
      personality: [],
      trainingLevels: [],
      experienceLevels: [],
    }),
}));

export default useFilters;
