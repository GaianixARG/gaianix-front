import type { LucideIcon, LucideProps } from "lucide-react"
import type {
  MyOmit,
} from "./types"
import type { JSX, LazyExoticComponent } from "react"
import type { EDistanciaSiembra, EOrderType, EPrioridad, ESeed, EStatus } from "./enums"

// Data
//#region Usuario
export interface IRol {
  id: string
  name: string
}

export interface IUser {
  id: string
  name: string
  role: IRol
  username: string
}

export interface IUserAuth {
  name: string
}
//#endregion

//#region Dashboard
export interface IDashboard {
  summary: Array<ISummaryItem>
  orders: IOrderTableDashboard[]
  recentActivities: Array<IRecentActivity>
}

export interface IOrderTableDashboard {
  id: string
  type: EOrderType
  lote: string
  dateOfCreation: string
  status: EStatus
}

export interface ISummaryItem {
  label: string
  value: number
  icon: LucideIcon
}

export interface IRecentActivity {
  id: string
  title: string
  description: string
  date: Date
}
//#endregion

//#region Campo
interface ICampo {
  id: string
  nombre: string
}

export interface ILote {
  id: string
  codigo: string
  campo: ICampo
}
//#endregion

//#region Fertilizer
export interface IFertilizer {
  id: string
  name: string
}
//#endregion

//#region Orders
export interface IOrderBase {
  id: string
  codigo: string
  title: string
  type: EOrderType
  status: EStatus
  lote: ILote
  dateOfCreation: string
  creator: IUser
  prioridad: EPrioridad
}

export type IOrderBaseDetails = Omit<IOrderBase, "creator" | "dateOfCreation">

//#region Siembra
interface IDatosSemilla {
  id: string
  semilla: ISeed
  cantidadSemillasHa: number
}

interface IDatosSiembra {
  id: string
  fechaMaxSiembra: string
  distanciaSiembra: EDistanciaSiembra
  cantidadHectareas: number
  datosSemilla: IDatosSemilla
  fertilizante: IFertilizer
}

export interface IOrderSiembra extends IOrderBase {
  type: EOrderType.Siembra
  siembra: IDatosSiembra
}

//#endregion

export interface IOrderFertilizacion extends IOrderBase {
  type: EOrderType.Fertilizacion
  fertilizacion: {
    fertilizante: string
    dosisKgHa: number
    metodo: string
  }
}

export interface IOrderCosecha extends IOrderBase {
  type: EOrderType.Cosecha
  cosecha: {
    fechaCosecha: string
    rendimientoEstimado: number
    maquinaria: string
    humedad: number
  }
}

export type IOrder =
  | IOrderSiembra
  | IOrderFertilizacion
  | IOrderCosecha

export type IOrderDetails = MyOmit<IOrder, "creator" | "dateOfCreation">

//#endregion

//#region Semillas
export interface ISeed {
  id: string
  name: string
  type: ESeed
}
//#endregion

export interface IModule {
  label: string
  to: string
  icon: LucideIcon
}

// Diccionarios

export interface DicRoute {
  [key: string]: LazyExoticComponent<() => JSX.Element>
}

export interface DicIcon {
  [key: string]: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
}

export interface DicSize {
  [key: string]: number
}

export interface IRoute {
  path: string
  label: string
  enabled: boolean
  group: string
}

export interface IRouteIcon extends IRoute {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}
