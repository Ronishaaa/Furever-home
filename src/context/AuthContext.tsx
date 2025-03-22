import {
  createContext,
  ReactNode,
  useContext,
  // useEffect,
  useState,
} from "react";

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
  login: (token: string, user: User) => void;
  logout: () => void;
  // verifyToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // const verifyToken = async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setIsAuthenticated(false);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get("/verify", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.data.valid) {
  //       setIsAuthenticated(true);
  //       setUser({ userId: response.data.userId });
  //     } else {
  //       setIsAuthenticated(false);
  //       setUser(null);
  //     }
  //   } catch (error) {
  //     console.log("Token verification failed", error);
  //     setIsAuthenticated(false);
  //     setUser(null);
  //   }
  // };

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
  };

  // useEffect(() => {
  //   verifyToken();
  // }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        // verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
