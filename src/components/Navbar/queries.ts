import { useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

interface Notification {
  id: number;
  message: string;
  createdAt: Date;
  pet: {
    name: string;
    images: string[];
    breed: string;
  };
  userId: number;
}

export const useGetNotifications = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["notifications", userId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User ID is required");
      }

      const { data } = await axios.get<{ data: Notification[] }>(
        `/api/notifications/${userId}`
      );
      return data.data;
    },
    enabled: !!userId,
  });
};
