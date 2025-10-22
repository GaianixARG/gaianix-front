import { EDistanciaSiembra, EOrderType, EPrioridad, ESeed, EStatus } from "../constants/enums"
import type { IOrderBaseDetails, IOrderDetails } from "../constants/interfaces"

const baseOrder: IOrderBaseDetails = {
    id: "",
    codigo: "",
    lote: {
      id: "",
      codigo: "",
      campo: {
        id: "",
        nombre: ""
      }
    },
    type: EOrderType.Cosecha,
    status: EStatus.Pendiente,
    title: "",
    prioridad: EPrioridad.Alta
  };

export const initialPerType: Record<EOrderType, IOrderDetails> = {
    [EOrderType.Siembra]: {
      ...baseOrder,
      type: EOrderType.Siembra,
      siembra: {
        cantidadHectareas: 0,
        distanciaSiembra: EDistanciaSiembra.Cercana,
        fechaMaxSiembra: new Date().toISOString(),
        id: "",
        datosSemilla: {
          id: "",
          semilla: {
            id: "",
            name: "",
            type: ESeed.Maiz
          },
          cantidadSemillasHa: 0
        },
        fertilizante: {
          id: "",
          name: ""
        }
      },
    },
    [EOrderType.Fertilizacion]: {
      ...baseOrder,
      type: EOrderType.Fertilizacion,
      fertilizacion: { fertilizante: "", dosisKgHa: 0, metodo: "" },
    },
    [EOrderType.Cosecha]: {
      ...baseOrder,
      type: EOrderType.Cosecha,
      cosecha: {
        fechaCosecha: "",
        rendimientoEstimado: 0,
        maquinaria: "",
        humedad: 0,
      },
    },
  };