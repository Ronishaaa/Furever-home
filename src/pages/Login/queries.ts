import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { axios } from "../../lib";
import { socket } from "../../socket";

interface Login {
  email: string;
  password: string;
}

export const useUpdateSocket = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      socketId,
    }: {
      userId: number;
      socketId: string;
    }) => {
      const { data } = await axios.patch(`api/socket/${userId}`, {
        socketId,
      });
      return data;
    },
  });
};

export const useLogin = () => {
  const { setUser, setSocketId } = useAuth();

  return useMutation({
    mutationFn: async (values: Login) => {
      try {
        socket.connect();

        if (socket.id) setSocketId(socket.id);
        console.log(socket.id);
        const { data } = await axios.post(`api/login`, {
          ...values,
          socketId: socket.id,
        });

        setUser(data.user);
        return data;
      } catch (error) {
        socket.disconnect();
        setSocketId(null);
        console.error(error);
      }
    },
    onError: (error) => {
      socket.disconnect();
      setSocketId(null);
      console.error("Login failed:", error);
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: async (data: { email: string }) => {
      const response = await axios.post("api/resend-verification", data);
      return response.data;
    },
  });
};
