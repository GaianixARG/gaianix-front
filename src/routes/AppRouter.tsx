import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import {
  NOT_FOUND_ROUTE_COMPONENT,
  PUBLIC_ROUTES_COMPONENT,
  PRIVATE_ROUTES_COMPONENT,
} from "../constants/routes";
import GlobalLoader from "../components/ui/GlobalLoader";

export default function AppRouter() {
  return (
    <Suspense>
      <GlobalLoader />
      <Routes>
        {PUBLIC_ROUTES_COMPONENT.map(({path, component: Component}) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {PRIVATE_ROUTES_COMPONENT.map(({path, component: Component}) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route
          path={NOT_FOUND_ROUTE_COMPONENT.path}
          element={<NOT_FOUND_ROUTE_COMPONENT.component />}
        />
      </Routes>
    </Suspense>
  );
}
