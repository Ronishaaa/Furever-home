// hooks/useDonation.ts
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DonationInput } from "../../components";

export const useMakeDonation = () => {
  return useMutation({
    mutationFn: async (data: DonationInput) => {
      const response = await axios.post("/api/donation", data);
      return response.data.paymentUrl;
    },
  });
};
