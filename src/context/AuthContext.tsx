import { createContext, useContext } from "react";
import type { IUser } from "../constants/interfaces";

type AuthContextType = {
  isAuthenticated: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
  user: IUser;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
