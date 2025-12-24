import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  NOT_FOUND_ROUTE_COMPONENT,
  PUBLIC_ROUTES_COMPONENT,
  PRIVATE_ROUTES_COMPONENT,
} from "../constants/routes";
import Loader from "../components/ui/Loader";

export default function AppRouter() {
  return (
    <Suspense fallback={<Loader type="primary" size="xl" isLoading  isGlobal/>}>
      <Routes>
        {PUBLIC_ROUTES_COMPONENT.map(({path, component: Component}) => (
          <Route key={path} path={path} element={<Component key={`com_${path}`} />} />
        ))}
        {PRIVATE_ROUTES_COMPONENT.map(({path, component: Component}) => (
          <Route key={path} path={path} element={<Component key={`com_${path}`} />} />
        ))}
        <Route
          path={NOT_FOUND_ROUTE_COMPONENT.path}
          element={<NOT_FOUND_ROUTE_COMPONENT.component />}
        />
      </Routes>
    </Suspense>
  );
}
