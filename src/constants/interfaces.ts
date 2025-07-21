import type { LucideIcon, LucideProps } from "lucide-react";
import type { TOrder, TRol, TStatus } from "./types";
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

export interface IOrder {
  id: string;
  type: TOrder;
  field: string;
  date: string;
  status: TStatus;
  creator: IUser;
  title: string;
  description: string;
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
