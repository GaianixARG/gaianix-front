import { TractorIcon, LeafIcon, ActivityIcon, DropletIcon } from "lucide-react";
import type { IDashboard } from "../interfaces";
import { EOrderType, EStatus } from "../enums";

export const dashboardMock: IDashboard = {
  summary: [
    { label: "Siembras", value: 18, icon: LeafIcon },
    { label: "Riegos", value: 12, icon: DropletIcon },
    { label: "Cosechas", value: 9, icon: TractorIcon },
    { label: "Actividades totales", value: 42, icon: ActivityIcon },
  ],
  recentActivities: [
    {
      id: "a1",
      title: "Siembra de trigo",
      description: "Se sembró trigo en Lote 1 con densidad de 120 kg/ha",
      date: new Date("2025-07-09"),
    },
    {
      id: "a2",
      title: "Aplicación de fertilizante",
      description: "Nitrato aplicado en Lote 3",
      date: new Date("2025-07-08"),
    },
    {
      id: "a3",
      title: "Riego profundo",
      description: "Riego automático completado en Lote 2",
      date: new Date("2025-07-07"),
    },
    {
      id: "a4",
      title: "Cosecha de soja",
      description: "Cosecha manual completada en Lote 5",
      date: new Date("2025-07-06"),
    },
    {
      id: "a5",
      title: "Análisis de suelo",
      description: "Resultados de PH y nitrógeno entregados",
      date: new Date("2025-07-05"),
    },
  ],
  orders: [
    {
      id: "o1",
      type: EOrderType.Siembra,
      lote: "Lote 1",
      dateOfCreation: "2025-07-09",
      status: EStatus.Pendiente,
    },
    {
      id: "o2",
      type: EOrderType.Fertilizacion,
      lote: "Lote 3",
      dateOfCreation: "2025-07-08",
      status: EStatus.EnCurso,
    },
    {
      id: "o3",
      type: EOrderType.Cosecha,
      lote: "Lote 2",
      dateOfCreation: "2025-07-07",
      status: EStatus.Pendiente,
    },
    {
      id: "o4",
      type: EOrderType.Cosecha,
      lote: "Lote 5",
      dateOfCreation: "2025-07-06",
      status: EStatus.Completada,
    },
    {
      id: "o5",
      type: EOrderType.Fertilizacion,
      lote: "Lote 7",
      dateOfCreation: "2025-07-05",
      status: EStatus.EnCurso,
    },
    {
      id: "o6",
      type: EOrderType.Cosecha,
      lote: "Lote 4",
      dateOfCreation: "2025-07-04",
      status: EStatus.Pendiente,
    },
  ],
};
