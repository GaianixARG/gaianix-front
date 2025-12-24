import type { ILote } from "../constants/interfaces";
import { api } from "./api";

export const infoCampoService = {
  getAllLotes: () => api.get<ILote[]>("/lotes"),
  createLote: (lote: Omit<ILote, "id">) => api.post<ILote>("/lotes", lote)
};