import { useEffect, useState } from "react";
import type { IUser } from "../constants/interfaces";
import { useAlert } from "../context/AlertContext";
import { authService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const initialUser: IUser = {
  id: "",
  name: "",
  username: "",
  role: "Visualizacion",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {showAlert} = useAlert();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(initialUser);

  const handleSetSession = (user: IUser, goTo: string) => {
    setIsAuthenticated(user.id !== "");
    setUser(user);
    window.location.href = goTo
  }

  useEffect(() => {
    let mounted = true;
    authService.me()
      .then((res) => {
        if (mounted) {
          setIsAuthenticated(true);
          setUser(res.data);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsAuthenticated(false);
          setUser(initialUser);
        }
      });
    return () => { mounted = false };
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      const userData = await authService.login(username, password);
      handleSetSession(userData.data.user, "/dashboard")
    } catch (err: any) {
      showAlert({
        type: "error",
        message: err.message,
        title: "Error al conectarse: "
      });
    }
  };


  const handleLogout = async () => {
    await authService.logout();
    handleSetSession(initialUser, "/login")
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, user }}>
      {children}
    </AuthContext.Provider>
  );
};