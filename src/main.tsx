import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import { AuthProvider } from "./providers/AuthProvider.tsx";
import { LoadingProvider } from "./providers/LoadingProvider.tsx";
import { AlertProvider } from "./providers/AlertProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <AlertProvider>
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </AlertProvider>
);
