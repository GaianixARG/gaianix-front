export const STATUS = {
  Pendiente: "Pendiente",
  EnCurso: "En curso",
  Completada: "Completado",
} as const;

export const ORDER_TYPES = {
  Siembra: "Siembra",
  Fertilización: "Fertilización",
  Riego: "Riego",
  Cosecha: "Cosecha",
} as const;

export const ROLES = {
  Administrador: "Administrador",
  Ingeniero: "Ingeniero",
  Operario: "Operario",
  Visualizacion: "Visualización",
} as const;
