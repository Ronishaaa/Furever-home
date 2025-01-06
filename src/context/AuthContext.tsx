import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Define the types for TypeScript
interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  verifyToken: () => void;
}

// Create the context
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

  // Verify token on app load
  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get("/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check the response from the backend
      if (response.data.valid) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Token verification failed", error);
      setIsAuthenticated(false);
    }
  };

  // Login action
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
