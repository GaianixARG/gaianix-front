import { BugOff, ChartPie, Droplets, Fence, Sprout, Tractor } from "lucide-react";
import type { TBoton, TColors, TStatusColor } from "./types";
import type { DicIcon, DicSize } from "./interfaces";
import { EOrderType, EPrioridad, ESeed, EStatus } from "./enums";

export const LABEL_PER_ICON: DicIcon = {
  Dashboard: ChartPie,
  Siembra: Sprout,
  Fertilización: BugOff,
  Riego: Droplets,
  Cosecha: Tractor,
  Lotes: Fence
};

export const SizeMap: DicSize = {
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

export const CLASE_X_BOTON: Record<TBoton, string> = {
  primary: "bg-primary text-white hover:bg-primary-light hover:text-black",
  secondary:
    "bg-secondary text-white hover:bg-secondary-light hover:text-black",
  tertiary: "bg-tertiary text-white hover:bg-tertiary-light hover:text-black",
  accent: "bg-accent text-accent-light hover:bg-accent-light hover:text-white",
  "primary-light":
    "bg-primary-light text-black hover:bg-primary hover:text-white",
  "secondary-light":
    "bg-secondary-light text-black hover:bg-secondary hover:text-white",
  "tertiary-light":
    "bg-tertiary-light text-black hover:bg-tertiary hover:text-white",
  "accent-light": "bg-accent-light text-black hover:bg-accent hover:text-white",
  error: "bg-error text-white hover:bg-error-light",
  success: "bg-success text-white hover:bg-success-light",
  warning: "bg-warning text-white hover:bg-warning-light",
  info: "bg-info text-white hover:bg-info-light",
  white: "bg-white text-black hover:bg-gray-300",
};

export const BADGESTYLE_X_STATUS: Record<TColors, string> = {
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  tertiary: "bg-tertiary text-white",
  accent: "bg-accent text-white",
  white: "bg-white text-black",
  warning: "bg-yellow-100 text-yellow-800",
  info: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  "primary-light": "bg-primary-light text-accent",
  "accent-light": "bg-accent-light text-accent"
};

export const BG_ICON_ROUNDED: Record<TColors, string> = {
  primary: "bg-primary/10",
  secondary: "bg-secondary/10",
  tertiary: "bg-tertiary/10",
  accent: "bg-accent/10",
  error: "bg-error/10",
  success: "bg-success/10",
  warning: "bg-warning/10",
  info: "bg-info/10",
  white: "bg-white/10",
  "primary-light": "bg-primary-light/10",
  "accent-light": "bg-accent-light/10"
};

export const TEXT_PER_STATUS_COLOR: Record<TColors, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  accent: "text-accent",
  error: "text-error",
  success: "text-success",
  warning: "text-warning",
  info: "text-info",
  white: "text-white",
  "primary-light": "text-primary-light",
  "accent-light": "text-accent-light"
};

export const BG_PER_STATUS_COLOR: Record<TColors, string> = {
  primary: "bg-primary/30",
  secondary: "bg-secondary/30",
  tertiary: "bg-tertiary/30",
  accent: "bg-accent/30",
  white: "bg-white/30",
  error: "bg-red-100",
  success: "bg-green-100/50",
  warning: "bg-yellow-100/50",
  info: "bg-blue-100/70",
  "primary-light": "bg-primary-light/30",
  "accent-light": "bg-accent-light/30"
};

export const ALERT_PER_STATUS_COLOR: Record<TStatusColor, string> = {
  error: "bg-error/20 text-error border border-error",
  success: "bg-success/20 text-success border border-success",
  warning: "bg-warning/20 text-warning border border-warning",
  info: " text-info border border-info",
  white: "bg-white/20 text-white border border-white",
};

export const COLOR_PER_STATUS: Record<EStatus, TColors> = {
  [EStatus.EnCurso]: "info",
  [EStatus.Pendiente]: "warning",
  [EStatus.Completada]: "success",
};

export const STATUS_NAME: Record<EStatus, string> = {
  [EStatus.Pendiente]: "Pendiente",
  [EStatus.EnCurso]: "En Curso",
  [EStatus.Completada]: "Completado"
}

export const ORDER_TYPE_NAME: Record<EOrderType, string> = {
  [EOrderType.Siembra]: "Siembra",
  [EOrderType.Fertilizacion]: "Fertilización",
  [EOrderType.Cosecha]: "Cosecha"
}

export const PRIORIDAD_NAME: Record<EPrioridad, string> = {
  [EPrioridad.Alta]: "Alta",
  [EPrioridad.Media]: "Media",
  [EPrioridad.Baja]: "Baja"
}

export const COLOR_SEMILLA: Record<ESeed, TColors> = {
  [ESeed.Maiz]: "tertiary",
  [ESeed.Trigo]: "secondary",
  [ESeed.Soja]: "accent",
  [ESeed.Girasol]: "primary",
  [ESeed.Arroz]: "accent-light",
  [ESeed.Cebada]: "info",
  [ESeed.Avena]: "error"
}