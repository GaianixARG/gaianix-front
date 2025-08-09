import type { LucideIcon, LucideProps } from "lucide-react";
import type {
  TDistanciaSiembra,
  TOrder,
  TPrioridad,
  TRiego,
  TRol,
  TStatus,
} from "./types";
import type { JSX, LazyExoticComponent } from "react";

// Data

export type IUser = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: TRol;
};

export interface IDashboard {
  summary: Array<ISummaryItem>;
  orders: Array<IOrder>;
  recentActivities: Array<IRecentActivity>;
}

export interface ISummaryItem {
  label: string;
  value: number;
  icon: LucideIcon;
}

export interface IOrderBase {
  id: string;
  codigo: string;
  type: TOrder;
  title: string;
  lote: string;
  dateOfCreation: string;
  status: TStatus;
  creator: IUser;
}

export type IOrder =
  | IOrderSiembra
  | IOrderRiego
  | IOrderFertilizacion
  | IOrderCosecha;

export interface IOrderSiembra extends IOrderBase {
  type: "Siembra";
  siembra: {
    fechaMaxSiembra: string;
    prioridad: TPrioridad;
    tipoSemilla: string;
    cantidadSemillasHa: number;
    cantidadHectareas: number;
    fertilizante: string;
    distanciaSiembra: TDistanciaSiembra;
  };
}

export interface IOrderRiego extends IOrderBase {
  type: "Riego";
  riego: {
    metodo: TRiego;
    cantidadMm: number;
    horas: number;
  };
}

export interface IOrderFertilizacion extends IOrderBase {
  type: "Fertilización";
  fertilizacion: {
    fertilizante: string;
    dosisKgHa: number;
    metodo: string;
  };
}

export interface IOrderCosecha extends IOrderBase {
  type: "Cosecha";
  cosecha: {
    fechaCosecha: string;
    rendimientoEstimado: number;
    maquinaria: string;
    humedad: number;
  };
}

export interface IRecentActivity {
  id: string;
  title: string;
  description: string;
  date: Date;
}

export interface IModule {
  label: string;
  to: string;
  icon: LucideIcon;
}

// Diccionarios

export interface DicRoute {
  [key: string]: LazyExoticComponent<() => JSX.Element>;
}

export interface DicIcon {
  [key: string]: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export interface DicSize {
  [key: string]: number;
}
