import { lazy } from "react";
import type { DicRoute, IRoute, IRouteIcon } from "./interfaces";
import { LABEL_PER_ICON } from "./conversiones";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Siembra = lazy(() => import("../pages/Siembra"));
const Fertilizacion = lazy(() => import("../pages/Fertilizacion"));
const Riego = lazy(() => import("../pages/Riego"));
const Cosecha = lazy(() => import("../pages/Cosecha"));
const Lotes = lazy(() => import("../pages/Lotes"));

const LABEL_PER_COMPONENT: DicRoute = {
  Landing: Landing,
  Login: Login,
  NotFound: NotFound,
  Dashboard: Dashboard,
  Siembra: Siembra,
  Fertilización: Fertilizacion,
  Riego: Riego,
  Cosecha: Cosecha,
  Lotes: Lotes
};

const GROUPS_TABS = {
  Gestion: "Gestión",
  Ordenes: "Órdenes"
}

export const PRIVATE_ROUTES: IRoute[] = [
  { path: "/dashboard", label: "Dashboard", enabled: true, group: GROUPS_TABS.Gestion },
  { path: "/lotes", label: "Lotes", enabled: true, group: GROUPS_TABS.Gestion },
  { path: "/siembra", label: "Siembra", enabled: true, group: GROUPS_TABS.Ordenes },
  { path: "/fertilizacion", label: "Fertilización", enabled: true, group: GROUPS_TABS.Ordenes },
  { path: "/riego", label: "Riego", enabled: false, group: GROUPS_TABS.Ordenes },
  { path: "/cosecha", label: "Cosecha", enabled: false, group: GROUPS_TABS.Ordenes }
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

export const PRIVATE_ROUTES_ICONS = PRIVATE_ROUTES.reduce((acc: Record<string, IRouteIcon[]>, route) => {
  const ant = acc[route.group] ?? []

  acc[route.group] = [...ant, {...route, icon: LABEL_PER_ICON[route.label]}]
  return acc
}, {})
