import { USUARIO_SESION } from "../constants/mocks/userData";
import type { IDashboard, IOrder, IUser } from "../constants/interfaces";
import { dashboardMock } from "../constants/mocks/dashboardData";
import { ordersMock } from "../constants/mocks/ordersData";

export const getUser = (token: string): IUser => {
  return USUARIO_SESION;
};

export const getDashboardData = (): Promise<IDashboard> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(dashboardMock), 500);
  });
};

export const getOrders = (): Promise<IOrder[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ordersMock), 500);
  });
};
