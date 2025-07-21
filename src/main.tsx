import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import AppRouter from "./routes/AppRouter.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { AlertProvider } from "./context/AlertProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LoadingProvider>
      <AlertProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </AlertProvider>
    </LoadingProvider>
  </BrowserRouter>
);
