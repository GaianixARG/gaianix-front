import type { IUser } from "../constants/interfaces";
import { api } from "./api";

export type LoginResponse = {
  access_token: string;
  user: IUser;
};

export const authService = {
  login: (username: string, password: string) =>
    api.post<LoginResponse>("/user/login", { username, password }),
  logout: () => api.post<void>("/user/logout", {}),
  me: () => api.get<IUser>("/user/me"),
};
