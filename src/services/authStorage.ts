import type { IUser } from "../constants/interfaces";
import { getItem, setItem, removeItem } from "./storage";

const AUTH_KEY = "gaianix_auth";

export const setAuth = (value: IUser): void => {
  setItem(AUTH_KEY, value);
};

export const getAuth = (): IUser | null => {
  return getItem<IUser>(AUTH_KEY) ?? null;
};

export const clearAuth = (): void => {
  removeItem(AUTH_KEY);
};
