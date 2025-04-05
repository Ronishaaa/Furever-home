import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface AdoptionApplication {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  householdMembers: string;
  homeOwnership: boolean;
  petAllowed: boolean;
  outdoorArea: boolean;
  aloneHours: number;
  otherPetsInfo: string;
  neuteredPets: boolean;
  upcomingEvents?: string;
  applicationStatus: string;
  userId: number;
  petId: number;
}

export const useAddApplication = () => {
  return useMutation({
    mutationFn: async (values: AdoptionApplication) => {
      const { data } = await axios.post("/api/application", values);
      return data;
    },
    onSuccess: (data) => {
      console.log("Application submitted successfully:", data);
    },
    onError: (error) => {
      console.error("Application submission failed:", error);
    },
  });
};
