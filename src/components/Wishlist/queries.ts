import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

interface WishlistInput {
  userId: number;
  ageMin?: number;
  ageMax?: number;
  gender: string;
  energyLevel?: string;
  breed?: string;
}

export interface MatchedPet {
  wishlistId: number;
  petId: number;
  createdAt: string;
  updatedAt: string;
  pet: {
    id: number;
    name: string;
    breed: string;
    age: number;
    gender: string;
    color: string;
    healthCondition: string | null;
    vaccination: boolean;
    adoptionStatus: string;
    images: string[];
    personality: string[];
    energyLevel: string;
    trainingLevel: string;
    strangerBehavior: string | null;
    specialTraits: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface WishlistData {
  id: number;
  userId: number;
  breed: string;
  ageMin: number;
  ageMax: number;
  energyLevel: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  MatchedPets: MatchedPet[];
}

export const useSetWishlist = () => {
  return useMutation({
    mutationFn: async (values: WishlistInput) => {
      const { data } = await axios.post("api/wishlist", values);
      return data;
    },
  });
};

export const useGetWishlist = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["wishlist", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const { data } = await axios.get<{ data: WishlistData }>(
        `api/wishlist/${userId}`
      );
      return data;
    },
    enabled: !!userId,
  });
};
