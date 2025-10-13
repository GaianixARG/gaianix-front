//import type { IDashboard } from "../constants/interfaces";
import { dashboardMock } from "../constants/mocks/dashboardData";
//import { api } from "./api";

export const dashboardService = {
  getDashboardData: () => dashboardMock//api.get<IDashboard>("/dashboard"),
};
