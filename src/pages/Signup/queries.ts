import { useMutation } from "@tanstack/react-query";
import { axios } from "../../lib";

type Signup = {
  name: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  return useMutation({
    mutationFn: async (values: Signup) => {
      const { data } = await axios.post("/api/sign-up", {
        username: values.name,
        email: values.email,
        password: values.password,
      });

      return data;
    },
  });
};
