import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../../lib";
import { Pet } from "../../../Adopt/queries";

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
