import { ESeed } from "../enums";
import type { ISeed } from "../interfaces";

export const mockSeeds: ISeed[] = [
  {
    id: "1",
    name: "Maíz Premium",
    type: ESeed.Maiz,
    provider: "Proveedor A",
  },
  {
    id: "2",
    name: "Soja Alta Producción",
    type: ESeed.Soja,
    provider: "Proveedor B",
  },
  {
    id: "3",
    name: "Trigo Resistente",
    type: ESeed.Trigo,
    provider: "Proveedor C",
  },
  {
    id: "4",
    name: "Girasol Orgánico",
    type: ESeed.Girasol,
    provider: "Proveedor D",
  },
  {
    id: "5",
    name: "Cebada Especial",
    type: ESeed.Cebada,
    provider: "Proveedor E",
  },
  {
    id: "6",
    name: "Avena Nutritiva",
    type: ESeed.Avena,
    provider: "Proveedor F",
  },
];
