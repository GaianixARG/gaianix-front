import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import { LoadingProvider } from "./providers/LoadingProvider.tsx";
import AlertContainter from "./components/ui/Alert/AlertContainer.tsx";
import GlobalLoader from "./components/ui/GlobalLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LoadingProvider>
        <GlobalLoader />
        <AlertContainter />
        <AppRouter />
    </LoadingProvider>
  </BrowserRouter>
);
