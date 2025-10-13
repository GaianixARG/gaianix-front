export enum EStatus {
  Pendiente,
  EnCurso,
  Completada
}

export enum EOrderType {
  Siembra = 'S',
  Fertilizacion = 'F',
  Cosecha = 'C'
}

export const ROLES = {
  Administrador: "Administrador",
  Ingeniero: "Ingeniero",
  Operario: "Operario",
  Visualizacion: "Visualización",
} as const;

export enum ERiego {
  Goteo = 'Goteo',
  Aspersion = 'Aspersión',
  Inundacion = 'Inundación'
}

export enum EPrioridad {
  Alta,
  Media,
  Baja
}

export enum EDistanciaSiembra {
  Cercana = 62,
  Media = 70,
  Lejana = 90
}

export enum ESeed {
  Maiz = 'Maíz',
  Trigo = 'Trigo',
  Soja = 'Soja',
  Girasol = 'Girasol',
  Arroz = 'Arroz',
  Cebada = 'Cebada',
  Avena = 'Avena'
}




