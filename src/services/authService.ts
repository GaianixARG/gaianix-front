import type { IUserAuth } from "../constants/interfaces";
import { api } from "./api";

export const authService = {
  login: (username: string, password: string) =>
    api.post<IUserAuth>("/users/login", { username, password }),
  refreshAuth: () => api.post<void>("/users/auth", {}),
  logout: () => api.post<void>("/users/logout", {})
};
