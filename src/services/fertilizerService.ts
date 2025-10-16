import type { IFertilizer } from "../constants/interfaces";
import { api } from "./api";

export const fertilizerService = {
  getAll: () => api.get<IFertilizer[]>("/fertilizers"),
  getById: (id: string) => api.get<IFertilizer>(`/fertilizers/${id}`),
  create: (seed: Omit<IFertilizer, "id">) => api.post<IFertilizer>("/fertilizers", seed),
  update: (id: string, fertilizer: Omit<IFertilizer, "id">) =>
    api.put<IFertilizer>(`/fertilizers/${id}`, fertilizer),
  remove: (id: string) => api.delete<void>(`/fertilizers/${id}`),
};
