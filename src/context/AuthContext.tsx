import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuth, getAuth, clearAuth } from "../services/authStorage";
import type { IUser } from "../constants/interfaces";
import { getUser } from "../services/api";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: IUser;
};

const initialUser: IUser = {
  id: 0,
  name: "",
  email: "",
  username: "",
  role: "Visualizacion",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(initialUser);

  useEffect(() => {
    const savedAuth = getAuth();
    setIsAuthenticated(savedAuth);
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setAuth(true);
    setUser(getUser(""));
    navigate("/dashboard");
  };

  const logout = () => {
    setIsAuthenticated(false);
    clearAuth();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
