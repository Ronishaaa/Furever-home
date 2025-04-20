import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../../lib";

export const useSendContactForm = () => {
  return useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    }) => {
      const response = await axios.post("/api/contact", data);
      return response.data;
    },
  });
};
