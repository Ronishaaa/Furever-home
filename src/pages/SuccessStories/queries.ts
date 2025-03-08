import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

interface SuccessStory {
  id: number;
  title: string;
  description: string;
  imageUrl: string[];
  adoptionDate: string;
}

export const useGetAllSuccessStories = () => {
  return useQuery({
    queryKey: ["Get-Success-Stories"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: SuccessStory[] }>(
        "api/success-stories"
      );
      return data.data;
    },
  });
};

export const useGetUniqueSuccessStories = (id: number | undefined) => {
  return useQuery({
    queryKey: ["Get-one-success-stories", id],
    queryFn: async () => {
      const { data } = await axios.get<{ data: SuccessStory }>(
        `api/success-stories/${id}`
      );
      return data.data;
    },
  });
};
