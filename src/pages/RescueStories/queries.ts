import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

interface RescueStory {
  id: number;
  title: string;
  description: string;
  imageUrl: string[];
  rescueDate: string;
}

export const useGetAllRescueStories = () => {
  return useQuery({
    queryKey: ["Get-Rescue-Stories"],
    queryFn: async () => {
      const { data } = await axios.get<{ data: RescueStory[] }>(
        "api/rescue-stories"
      );
      return data.data;
    },
  });
};

export const useGetUniqueRescueStories = (id: number | undefined) => {
  return useQuery({
    queryKey: ["Get-one-rescue-stories", id],
    queryFn: async () => {
      const { data } = await axios.get<{ data: RescueStory }>(
        `api/rescue-stories/${id}`
      );
      return data.data;
    },
  });
};
