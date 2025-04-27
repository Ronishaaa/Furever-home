import { useMutation } from "@tanstack/react-query";
import { axios } from "../../lib";

export interface DogInput {
  grooming: number | null;
  shedding: number | null;
  energy: number | null;
  trainability: number | null;
  lifestyle: "active" | "moderate" | "sedentary" | null;
  home_type: "apartment" | "townhouse" | "house" | "farm" | null;
  experience_level: "first-time" | "experienced" | null;
}
interface BreedRecommendation {
  recommendedBreeds: string[];
}
export const useRecommendBreed = () => {
  return useMutation({
    mutationFn: async (values: DogInput) => {
      const { data } = await axios.post<BreedRecommendation>(
        "api/breed/recommend",
        values
      );
      return data;
    },
  });
};
