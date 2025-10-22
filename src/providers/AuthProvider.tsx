import { useCallback, useMemo, useState } from "react";
import type { IUser } from "../constants/interfaces";
import { authService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAlertStore } from "../store/alertStore";

const initialUser: IUser = {
  id: "",
  name: "",
  username: "",
  role: {
    id: "",
    name: ""
  },
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const showAlert = useAlertStore(state => state.showAlert);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(initialUser);

  const handleSetSession =  useCallback((userSession: IUser, goTo: string) => {
    setIsAuthenticated(userSession.id !== "");
    setUser(userSession);
    navigate(goTo)
  }, [navigate])

  // useEffect(() => {
  //   let mounted = true;
  //   authService.me()
  //     .then((res) => {
  //       if (mounted) {
  //         setIsAuthenticated(true);
  //         setUser(res.data);
  //       }
  //     })
  //     .catch(() => {
  //       if (mounted) {
  //         setIsAuthenticated(false);
  //         setUser(initialUser);
  //       }
  //     });
  //   return () => { mounted = false };
  // }, []);

  const handleLogin = useCallback(async (username: string, password: string) => {
    try {
      const userData = await authService.login(username, password);
      handleSetSession(userData.data.user, "/dashboard")
    } catch {
      showAlert({
        type: "error",
        message: "Usuario o contraseña invalidos"
      });
    }
  }, [showAlert, handleSetSession])

  const handleLogout = useCallback(async () => {
    await authService.logout();
    handleSetSession(initialUser, "/login")
  }, [handleSetSession])

  const contextValue = useMemo(() => ({
    isAuthenticated,
      handleLogin,
      handleLogout,
      user
  }), [handleLogin, handleLogout, isAuthenticated, user])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};