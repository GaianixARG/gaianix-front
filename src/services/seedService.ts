import type { ISeed } from "../constants/interfaces";
import { api } from "./api";


export const seedService = {
  getAll: () => api.get<ISeed[]>("/seeds"),
  getById: (id: string) => api.get<ISeed>(`/seeds/${id}`),
  create: (seed: Omit<ISeed, "id">) => api.post<ISeed>("/seeds", seed),
  update: (id: string, seed: Omit<ISeed, "id">) =>
    api.put<ISeed>(`/seeds/${id}`, seed),
  remove: (id: string) => api.delete<void>(`/seeds/${id}`),
};
