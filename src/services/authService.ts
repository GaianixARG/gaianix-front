import type { IUser } from "../constants/interfaces";
import { api } from "./api";

export type LoginResponse = {
  access_token: string;
  user: IUser;
};

export const authService = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>("/users/login", { username, password }),
  logout: () => api.post<void>("/users/logout", {}),
  me: () => api.get<IUser>("/users/me"),
};
