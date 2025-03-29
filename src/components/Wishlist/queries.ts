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

      const { data } = await axios.get<{ data: WishlistInput }>(
        `api/wishlist/${userId}`
      );
      return data;
    },
    enabled: !!userId,
  });
};
