import { useMutation } from "@tanstack/react-query";
import { axios } from "../../lib";

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const response = await axios.post("api/resend-otp", { email });
      return response.data;
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
      const response = await axios.post("api/verify-otp", { email, otp });
      return response.data;
    },
  });
};
