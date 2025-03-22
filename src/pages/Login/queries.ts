import { useMutation } from "@tanstack/react-query";
import { axios } from "../../lib";
import { socket } from "../../socket";

interface Login {
  email: string;
  password: string;
  socketId?: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (values: Login) => {
      const socketId = socket.id;
      const { data } = await axios.post(`api/login`, { ...values, socketId });
      return data;
    },
  });
};
