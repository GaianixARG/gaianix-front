import type { LucideIcon } from "lucide-react";
import type {
  ORDER_TYPES,
  STATUS,
  ROLES,
  RIEGOS,
  PRIORIDADES,
  DISTANCIA_SIEMBRA,
} from "./enums";
import type {
  IOrder,
  IOrderBase,
  IOrderCosecha,
  IOrderFertilizacion,
  IOrderRiego,
  IOrderSiembra,
} from "./interfaces";

export type TOrder = keyof typeof ORDER_TYPES;
export type TRiego = keyof typeof RIEGOS;
export type TPrioridad = keyof typeof PRIORIDADES;
export type TDistanciaSiembra =
  (typeof DISTANCIA_SIEMBRA)[keyof typeof DISTANCIA_SIEMBRA];

export type TFunctionToggle = "toggle" | "open" | "close";
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
// generar un tipo que contenga las propiedades de IOrderSiembra con el prefijo "siembra."
export type TPropertiesSiembra = `siembra.${keyof IOrderSiembra["siembra"]}`;
export type TPropertiesRiego = `riego.${keyof IOrderRiego["riego"]}`;
export type TPropertiesFertilizacion =
  `fertilizacion.${keyof IOrderFertilizacion["fertilizacion"]}`;
export type TPropertiesCosecha = `cosecha.${keyof IOrderCosecha["cosecha"]}`;

export type TPropertiesOrder =
  | keyof IOrderBase
  | TPropertiesCosecha
  | TPropertiesFertilizacion
  | TPropertiesRiego
  | TPropertiesSiembra;

export type TFormDetailsOrder = {
  order: IOrder;
  onChangeValue: (property: TPropertiesOrder, value: any) => void;
};

export type TabHeaderItemProps = {
  tabId: string;
  icon?: LucideIcon;
  label: string;
  isActive: boolean;
  contentTabId: string;
  onClick: () => void;
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
