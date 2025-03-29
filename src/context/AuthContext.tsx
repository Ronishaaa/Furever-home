import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { MdPlayCircleOutline } from "react-icons/md";
import { toast } from "sonner";
import { axios } from "../lib";
import { useUpdateSocket } from "../pages/Login/queries";
import { socket } from "../socket";

interface User {
  id: number;
  email: string;
  username: string;
  phoneNumber: string | null;
  address: string | null;
  verified: boolean;
  otp: string;
  otpExpiration: string;
  socketId: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  socketId: string | null;
  setSocketId: (id: string | null) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
  verifyToken: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
interface Pet {
  id: number;
  breed: string;
  gender: string;
  ageMin: number;
  ageMax: number;
  energyLevel: string;
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [socketId, setSocketId] = useState<string | null>(null);
  const { mutate: updateSocket } = useUpdateSocket();

  useEffect(() => {
    if (!user) {
      socket.disconnect();
      return;
    }

    socket.connect();

    socket.on("connect", () => {
      const currentSocketId = socket.id ?? null;
      setSocketId(currentSocketId);
      console.log("Socket connected:", currentSocketId);

      // Ensure socketId exists before updating the backend
      if (user.id && currentSocketId) {
        updateSocket({ socketId: currentSocketId, userId: user.id });
      }
    });

    socket.on("newPetMatch", (data: { message: string; pet: Pet }) => {
      console.log("Received new pet match:", data);
      alert(data.message);
      toast("New Pet", {
        className: "my-classname",
        description: data.message,
        duration: 5000,
        icon: <MdPlayCircleOutline />,
      });
    });

    return () => {
      socket.off("connect");
      socket.off("newPetMatch");
    };
  }, [updateSocket, user]);

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      return;
    }

    try {
      const response = await axios.get("api/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.valid) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.log("Token verification failed", error);
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    socket.disconnect();
    setSocketId(null);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        socketId,
        login,
        logout,
        setUser,
        verifyToken,
        setSocketId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
