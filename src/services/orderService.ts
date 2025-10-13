import type { IOrder, IOrderDetails } from "../constants/interfaces";
import { api } from "./api";

export const orderService = {
  getAll: () => api.get<IOrder[]>("/orders"),
  getById: (id: string) => api.get<IOrder>(`/orders/${id}`),
  getByType: (type: string) => api.get<IOrder[]>(`/orders?type=${type}`),
  create: (order: IOrderDetails) => api.post<IOrder>("/orders", order),
  update: (order: IOrderDetails) =>
    api.put<IOrder>(`/orders/${order.id}`, order),
  remove: (id: string) => api.delete<void>(`/orders/${id}`),
};
