import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useAlertStore } from "../../store/alertStore";

const useAuth = () => {
  const navigate = useNavigate()
  const showAlert = useAlertStore(state => state.showAlert)
  const handleLogin = useAuthStore(state => state.handleLogin)
  const handleLogout = useAuthStore(state => state.handleLogout)

  const onLogout = () => {
    handleLogout()
    navigate("/login")
  }

  const onLogin = async (username: string, password: string) => {
    const exito = await handleLogin(username, password)
    if (exito) navigate("/dashboard")
    else {
      showAlert({
        type: "error",
        message: "Usuario o contraseña invalidos"
      })
    }
  }

  return {
    onLogout,
    onLogin
  }
};

export default useAuth