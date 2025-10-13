import type { LoginResponse } from "../services/authService";
import { getItem, setItem, removeItem } from "../services/storage";

const AUTH_KEY = "gaianix_auth";

export const setAuth = (value: LoginResponse): void => {
  setItem(AUTH_KEY, value);
};

export const getAuth = (): LoginResponse | null => {
  return getItem<LoginResponse>(AUTH_KEY) ?? null;
};

export const clearAuth = (): void => {
  removeItem(AUTH_KEY);
};
