import { lazy } from "react";
import type { DicRoute } from "./interfaces";
import { LABEL_PER_ICON } from "./conversiones";

const Landing = lazy(() => import("../pages/Landing"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Siembra = lazy(() => import("../pages/Siembra"));

const LABEL_PER_COMPONENT: DicRoute = {
  Landing: Landing,
  Login: Login,
  NotFound: NotFound,
  Dashboard: Dashboard,
  Ordenes: Orders,
  Siembra: Siembra,
};

export const PRIVATE_ROUTES = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/ordenes", label: "Ordenes" },
  { path: "/siembra", label: "Siembra" },
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
