import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";
import qs from "qs";
export interface Pet {
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

export const useGetPets = (params: {
  searchTerm?: string;
  ageMin?: number;
  ageMax?: number;
  gender?: string;
  energyLevels?: string[];
  personality?: string[];
  trainingLevels?: string[];
  experienceLevels?: string[];
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
}) => {
  return useQuery({
    queryKey: ["Get-Pets", params],
    queryFn: async () => {
      const queryString = qs.stringify(params, {
        arrayFormat: "repeat", 
        skipNulls: true,    
      });

      const { data } = await axios.get<{ data: Pet[] }>(`/api/pets?${queryString}`);
      return data;
    },
  });
};

export const useGetUniquePets = (id: number | undefined) => {
  return useQuery({
    queryKey: ["Get-one-pets", id],
    queryFn: async () => {
      const { data } = await axios.get<{ pet: Pet }>(`api/pets/${id}`);
      return data;
    },
  });
};
