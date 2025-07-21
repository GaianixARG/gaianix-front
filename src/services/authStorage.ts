import { getItem, setItem, removeItem } from "./storage";

const AUTH_KEY = "gaianix_auth";

export const setAuth = (value: boolean): void => {
  setItem(AUTH_KEY, value);
};

export const getAuth = (): boolean => {
  return getItem<boolean>(AUTH_KEY) ?? false;
};

export const clearAuth = (): void => {
  removeItem(AUTH_KEY);
};
