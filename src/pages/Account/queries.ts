import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../../lib";

interface Pet {
  id: number;
  name: string;
  breed: string;
  age: number;
  gender: string;
  images: string[];
}

export interface AdoptionApplicationData {
  id: number;
  pet: Pet;
  applicationStatus: "Approved" | "Rejected" | "Pending";
  createdAt: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string | null;
  address: string | null;
  application: AdoptionApplicationData[];
}

interface UpdateUserData {
  username?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export const useGetUser = (userId: number | undefined) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const { data } = await axios.get<{ data: User }>(`/api/user/${userId}`);
      return data.data;
    },
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      userData,
    }: {
      userId: number;
      userData: UpdateUserData;
    }) => {
      const { data } = await axios.patch<{ data: User }>(
        `/api/${userId}`,
        userData
      );
      return data.data;
    },
  });
};
