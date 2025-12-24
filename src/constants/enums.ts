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

export enum EHttpStatusCode {
  // errors server
  INTERNAL_SERVER_ERROR = 500,
  // error client
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  // correct
  OK = 200,
  OK_CREATED = 201,
  OK_NO_CONTENT = 204,
}

export enum EMetodoFertilizacion {
  FondoSurco,
  Fertirrigacion,
  Foliar,
  Localizada
}

export enum ETipoPoligono {
  Poligono = 'Polygon',
  Circle = 'Point'
}