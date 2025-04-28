import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../../lib";
interface Pet {
  id: number;
  name: string;
  adoptionStatus: string;
  age: number;
  breed: string;
  color?: string | null;
  gender: string;
  healthCondition?: string | null;
  description?: string | null;
  vaccination: boolean;
  images?: string[];
  personality: string[];
  energyLevel: string;
  strangerBehavior?: string | null;
  trainingLevel: string;
  specialTraits?: string | null;
  adoptionInfo?: {
    idealHome?: string | null;
    childrenFriendly: boolean;
    otherPetsFriendly: boolean;
    experienceLevel: string;
    specialNeeds?: string | null;
  };
}

export const useGetSimilarPets = (id: number | undefined) => {
  return useQuery({
    queryKey: ["Get-similar-pets", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await axios.get<{ pets: Pet[] }>(
        `/api/pets/similar/${id}`
      );
      return data;
    },
  });
};
