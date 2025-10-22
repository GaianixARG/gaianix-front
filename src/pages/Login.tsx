import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import ButtonLoading from "../components/ui/ButtonLoading";
import PublicLayout from "../layouts/PublicLayout";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import useAuth from "../hooks/context/useAuth";


const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const { onLogin } = useAuth()
  const handleLogin = (username: string, password: string) => async () => {
    setIsLoading(true)
    await onLogin(username, password)
    setIsLoading(false)
  }

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard")
  }, [isAuthenticated, navigate])

  return (
    <PublicLayout>
      <h1 className="text-5xl font-bold mb-10">Login</h1>
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
            defaultValue={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        <ButtonLoading
          isLoading={isLoading}
          className="w-full"
          text="Login"
          onClick={handleLogin(username, password)}
        />
      </form>
    </PublicLayout>
  );
};

export default Login;
