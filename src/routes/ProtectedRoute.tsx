import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

type Props = { children: React.ReactNode; to: string };

const ProtectedRoute = ({ children, to }: Props) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to={to} />;
};

export default ProtectedRoute;
