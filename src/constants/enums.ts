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

export const RIEGOS = {
  Goteo: "Goteo",
  Aspersión: "Aspersión",
  Inundación: "Inundación",
} as const;

export const PRIORIDADES = {
  Alta: "Alta",
  Media: "Media",
  Baja: "Baja",
} as const;

export const DISTANCIA_SIEMBRA = {
  Cercana: 62,
  Media: 70,
  Lejana: 90,
} as const;
