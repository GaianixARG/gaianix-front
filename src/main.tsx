import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import AlertContainter from "./components/ui/Alert/AlertContainer.tsx";
import GlobalLoader from "./components/ui/GlobalLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <GlobalLoader />
    <AlertContainter />
    <AppRouter />
  </BrowserRouter>
);
