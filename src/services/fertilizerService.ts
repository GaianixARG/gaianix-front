import type { IFertilizer } from "../constants/interfaces";
import { api } from "./api";

export const fertilizerService = {
  getAll: () => api.get<IFertilizer[]>("/fertilizer"),
  getById: (id: string) => api.get<IFertilizer>(`/fertilizer/${id}`),
  create: (seed: Omit<IFertilizer, "id">) => api.post<IFertilizer>("/fertilizer", seed),
  update: (id: string, fertilizer: Omit<IFertilizer, "id">) =>
    api.put<IFertilizer>(`/fertilizer/${id}`, fertilizer),
  remove: (id: string) => api.delete<void>(`/fertilizer/${id}`),
};
