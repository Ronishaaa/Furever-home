import { useMutation } from "@tanstack/react-query";
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
