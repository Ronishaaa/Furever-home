import { useQuery } from "@tanstack/react-query";
import qs from "qs";
import { axios } from "../../lib";

export interface MetaData {
  limit: number;
  skip: number;
  total: number;
}

export interface Pet {
  data: {
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
  }[];
  meta: MetaData;
}

export const fetchAllPets = async (params: {
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
  const queryString = qs.stringify(params, {
    arrayFormat: "repeat",
    skipNulls: true,
  });

  const { data } = await axios.get<Pet>(`/api/pets?${queryString}`);
  return data;
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
