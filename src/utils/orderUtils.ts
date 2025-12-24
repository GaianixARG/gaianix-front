import { EDistanciaSiembra, EMetodoFertilizacion, EOrderType, EPrioridad, ESeed, EStatus, ETipoPoligono } from "../constants/enums"
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
      },
      poligono: {
        id: "",
        color: "",
        type: ETipoPoligono.Poligono,
        radius: 0,
        coordenadas: []
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
      fertilizacion: { fertilizante: { id: "", name: ""}, dosisKgHa: 0, metodo: EMetodoFertilizacion.FondoSurco },
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