import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "./userContext";

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
