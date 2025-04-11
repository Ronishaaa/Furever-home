import { create } from "zustand";

export enum EnergyLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Temperament {
  Friendly = "Friendly",
  Shy = "Shy",
  Aggressive = "Aggressive",
  Calm = "Calm",
  Playful = "Playful",
}

export enum TrainingLevel {
  None = "None",
  Basic = "Basic",
  Advanced = "Advanced",
}

export enum ExperienceLevel {
  FirstTimeOwner = "FirstTimeOwner",
  ExperiencedOwner = "ExperiencedOwner",
}
interface FiltersStore {
  ageMin: number;
  ageMax: number;
  gender: string;
  energyLevels: EnergyLevel[];
  personality: string[];
  trainingLevels: TrainingLevel[];
  experienceLevels: ExperienceLevel[];

  setAgeMin: (age?: number) => void;
  setAgeMax: (age?: number) => void;
  setGender: (gender?: string) => void;
  setEnergyLevel: (level: EnergyLevel) => void;
  setPersonality: (trait: string) => void;
  setTrainingLevel: (level: TrainingLevel) => void;
  setExperienceLevel: (level: ExperienceLevel) => void;
  clearAll: () => void;
}

const useFilters = create<FiltersStore>((set) => ({
  ageMin: 0,
  ageMax: 30,
  gender: "",
  energyLevels: [],
  personality: [],
  trainingLevels: [],
  experienceLevels: [],

  setAgeMin: (age) => set({ ageMin: age }),
  setAgeMax: (age) => set({ ageMax: age }),
  setGender: (gender) => set({ gender }),

  setEnergyLevel: (level) =>
    set((state) => ({
      energyLevels: state.energyLevels.includes(level)
        ? state.energyLevels.filter((item) => item !== level)
        : [...state.energyLevels, level],
    })),

  setPersonality: (trait) =>
    set((state) => ({
      personality: state.personality.includes(trait)
        ? state.personality.filter((item) => item !== trait)
        : [...state.personality, trait],
    })),

  setTrainingLevel: (level) =>
    set((state) => ({
      trainingLevels: state.trainingLevels.includes(level)
        ? state.trainingLevels.filter((item) => item !== level)
        : [...state.trainingLevels, level],
    })),

  setExperienceLevel: (level) =>
    set((state) => ({
      experienceLevels: state.experienceLevels.includes(level)
        ? state.experienceLevels.filter((item) => item !== level)
        : [...state.experienceLevels, level],
    })),

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
