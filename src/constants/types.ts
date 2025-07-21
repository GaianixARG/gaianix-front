import type { ORDER_TYPES, STATUS, ROLES } from "./enums";

export type TOrder = keyof typeof ORDER_TYPES;

export type TRol = keyof typeof ROLES;
export type TStatus = (typeof STATUS)[keyof typeof STATUS];
export type TStatusColor = "error" | "success" | "warning" | "info" | "white";
export type TColors =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "white"
  | TStatusColor;
export type TBoton =
  | "primary"
  | "secondary"
  | "tertiary"
  | "accent"
  | "primary-light"
  | "secondary-light"
  | "tertiary-light"
  | "accent-light"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "white";

export type TSize = "sm" | "md" | "lg" | "xl";

export type TAlert = {
  id?: string;
  type: TStatusColor;
  message: string;
  title: string;
  onClose?: () => void;
};

// CONTEXT TYPES

export type TLoadingContextProvider = {
  isLoading: boolean;
  setLoading: FLoading;
};

export type TAlertContextProvider = {
  showAlert: FShowAlert;
  dismissAlert: (id: string) => void;
};

// FUNCIONES TYPES
export type FLoading = (value: boolean) => void;
export type FShowAlert = (alert: TAlert) => void;
