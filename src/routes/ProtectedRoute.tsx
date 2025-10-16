import { Navigate } from "react-router-dom";
import useAuth from "../hooks/context/useAuth";

type Props = { children: React.ReactNode; to: string };

const ProtectedRoute = ({ children, to }: Props) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to={to} />;
};

export default ProtectedRoute;
