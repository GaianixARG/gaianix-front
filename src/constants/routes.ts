import { lazy } from "react";
import type { DicRoute } from "./interfaces";
import { LABEL_PER_ICON } from "./conversiones";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Siembra = lazy(() => import("../pages/Siembra"));
const Fertilizacion = lazy(() => import("../pages/Fertilizacion"));
const Riego = lazy(() => import("../pages/Riego"));
const Cosecha = lazy(() => import("../pages/Cosecha"));

const LABEL_PER_COMPONENT: DicRoute = {
  Landing: Landing,
  Login: Login,
  NotFound: NotFound,
  Dashboard: Dashboard,
  Siembra: Siembra,
  Fertilización: Fertilizacion,
  Riego: Riego,
  Cosecha: Cosecha,
};

export const PRIVATE_ROUTES = [
  { path: "/dashboard", label: "Dashboard", enabled: true },
  { path: "/siembra", label: "Siembra", enabled: true },
  { path: "/fertilizacion", label: "Fertilización", enabled: false },
  { path: "/riego", label: "Riego", enabled: false },
  { path: "/cosecha", label: "Cosecha", enabled: false },
];

export const PUBLIC_ROUTES = [
  { path: "/", label: "Landing" },
  { path: "/login", label: "Login" },
];

export const PRIVATE_ROUTES_COMPONENT = PRIVATE_ROUTES.map((route) => ({
  ...route,
  component: LABEL_PER_COMPONENT[route.label],
}));

export const PUBLIC_ROUTES_COMPONENT = PUBLIC_ROUTES.map((route) => ({
  ...route,
  component: LABEL_PER_COMPONENT[route.label],
}));

export const NOT_FOUND_ROUTE_COMPONENT = {
  path: "*",
  label: "Not Found",
  component: NotFound,
};

export const PRIVATE_ROUTES_ICONS = PRIVATE_ROUTES.map((route) => ({
  ...route,
  icon: LABEL_PER_ICON[route.label],
}));
