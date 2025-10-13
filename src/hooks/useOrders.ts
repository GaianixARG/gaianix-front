import { useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import type { FLoading, FShowAlert } from "../constants/types";
import type { IOrder, IOrderBaseDetails, IOrderDetails } from "../constants/interfaces";
import { EDistanciaSiembra, EOrderType, EPrioridad, ESeed, EStatus } from "../constants/enums";
import useCalendar from "./useCalendar";

const _initialOrders: IOrder[] = [];

const useOrders = (type: EOrderType, setLoading: FLoading, showAlert: FShowAlert) => {
  const {formatToValue} = useCalendar()
  const [orders, setOrders] = useState(_initialOrders);

  const getOrdersByStatus = (status: EStatus) => {
    return orders.filter((order) => order.status === status);
  };

  const handleDropOrder = (orderId: string, newStatus: EStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const addNewOrder = async (order: IOrderDetails) => {
    let huboError = false
    let msj = ""
    try {
      setLoading(true)
      const newOrder = (await orderService.create(order)).data;
      setOrders((prev) => [...prev, newOrder]);
      msj = `${newOrder.codigo} - ${newOrder.title}`
    } catch (error: any) {
      huboError = true
      msj = error.message
    } finally {
      setLoading(false)
      showAlert({
        type: huboError ? "error" : "success",
        message: huboError ? "Error:" : ("Orden creada exitosamente - " + msj),
      });
    }
  };

  const updateOrder = async (order: IOrderDetails) => {
    let huboError = false
    let msj = ""
    try {
      setLoading(true)
      const updatedOrder = (await orderService.update(order)).data;
      setOrders((prev) =>
        prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
      );
      msj = `${updatedOrder.codigo} - ${updatedOrder.title}`
    } catch (error: any) {
      huboError = true
      msj = error.message
    } finally {
      setLoading(false)
      showAlert({
        type: huboError ? "error" : "success",
         message: huboError ? "Error:" : ("Orden actualizada exitosamente - " + msj),
      });
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderService.getByType(type)
        setOrders(response.data)
      } catch (error: any) {
        showAlert({
          type: "error",
          message: error.message,
        })
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [setLoading, showAlert, type]);

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
    type: type,
    status: EStatus.Pendiente,
    title: "",
    prioridad: EPrioridad.Alta
  };

  const initialPerType: Record<EOrderType, IOrderDetails> = {
    [EOrderType.Siembra]: {
      ...baseOrder,
      type: EOrderType.Siembra,
      siembra: {
        cantidadHectareas: 0,
        distanciaSiembra: EDistanciaSiembra.Cercana,
        fechaMaxSiembra: formatToValue(new Date()),
        id: "",
        datosSemilla: {
          id: "",
          semilla: {
            id: "",
            name: "",
            type: ESeed.Maiz,
            provider: ""
          },
          cantidadSemillasHa: 0,
          fertilizante: ""
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

  return {
    orders,
    getOrdersByStatus,
    handleDropOrder,
    newOrder: initialPerType[type],
    addNewOrder,
    updateOrder
  };
};

export default useOrders;
