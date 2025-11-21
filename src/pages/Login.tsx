import { Eye, EyeOff } from "lucide-react";
import { useEffect, useId, useState } from "react";
import ButtonLoading from "../components/ui/ButtonLoading";
import PublicLayout from "../layouts/PublicLayout";
import Button from "../components/ui/Button";
import { useAuthStore } from "../store/authStore";
import useAuth from "../hooks/context/useAuth";


const Login = () => {
  const idUsername = useId()
  const idPassword = useId()

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const { onLogin, onRefreshLogin } = useAuth()
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsLoading(true)
    
    const formData = new FormData(event.currentTarget)

    const data = {
      username: formData.get(idUsername)?.toString() ?? "",
      password: formData.get(idPassword)?.toString() ?? ""
    }

    await onLogin(data.username, data.password)
    setIsLoading(false)
  }

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) onRefreshLogin()
  }, [isAuthenticated, onRefreshLogin])

  return (
    <PublicLayout>
      <h1 className="text-5xl font-bold mb-10">Login</h1>
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor={idUsername}
          >
            Username
          </label>
          <input
            id={idUsername}
            name={idUsername}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor={idPassword}>
            Password
          </label>
          <div className="relative">
            <input
              id={idPassword}
              name={idPassword}
              type={showPassword ? "text" : "password"}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
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
          type="submit"
          isLoading={isLoading}
          className="w-full"
          text="Login"
        />
      </form>
    </PublicLayout>
  );
};

export default Login;
