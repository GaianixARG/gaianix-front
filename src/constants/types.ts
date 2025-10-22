import type { LucideIcon } from "lucide-react"
import type {ROLES} from "./enums"
import type { IOrderDetails, IUser } from "./interfaces"

export type TFunctionToggle = "toggle" | "open" | "close"
export type TRol = keyof typeof ROLES
//export type TStatus = (typeof STATUS)[keyof typeof STATUS]
export type TStatusColor = "error" | "success" | "warning" | "info" | "white"
export type TColors =
  | "primary"
  | "primary-light"
  | "secondary"
  | "tertiary"
  | "accent"
  | "accent-light"
  | "white"
  | TStatusColor
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
  | "white"

export type TSize = "sm" | "md" | "lg" | "xl"

export type TResponseApi<T> = {
  exito: boolean,
  data: T
}

export type TAlert = {
  id?: string
  type: TStatusColor
  message: string
  onClose?: () => void
}

export type TFormDetailsOrder = {
  order: IOrderDetails
  onChangeValue: (property: string, value: any) => void
}

export type TFormDetailsOrderType = {
  order: IOrderDetails
  onChangeValue: (property: string, value: any) => void
}

export type TabHeaderItemProps = {
  tabId: string
  icon?: LucideIcon
  label: string
  isActive: boolean
  contentTabId: string
  onClick?: () => void
}

// CONTEXT TYPES

export type TLoadingContextProvider = {
  isLoading: boolean
  setLoading: FLoading
}

export type TAlertContextProvider = {
  showAlert: FShowAlert
  dismissAlert: (id: string) => void
}

export type TAuthContextType = {
  isAuthenticated: boolean
  handleLogin: (username: string, password: string) => Promise<boolean>
  handleLogout: () => void
  user: IUser
}

// FUNCIONES TYPES
export type FLoading = (value: boolean) => void
export type FShowAlert = (alert: TAlert) => void
export type FOrderDetails = (data: IOrderDetails) => void

// UTILES
export type MyOmit<T, K extends PropertyKey> =
    { [P in keyof T as Exclude<P, K>]: T[P] }