import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import type { FLoading, TOrder, TStatus } from "../constants/types";
import type { IOrder, IOrderBase } from "../constants/interfaces";
import { DISTANCIA_SIEMBRA, RIEGOS, STATUS } from "../constants/enums";

const _initialOrders: IOrder[] = [];

const useOrders = (type: TOrder, setLoading: FLoading) => {
  const [orders, setOrders] = useState(_initialOrders);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.filter((order) => order.type === type));
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getOrdersByStatus = (status: TStatus) => {
    return orders.filter((order) => order.status === status);
  };

  const handleDropOrder = (orderId: string, newStatus: TStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const baseOrder: IOrderBase = {
    id: "",
    lote: "",
    codigo: "",
    type: type,
    dateOfCreation: "",
    status: STATUS.Pendiente,
    creator: {
      id: 0,
      name: "",
      email: "",
      username: "",
      role: "Visualizacion",
    },
    title: "",
  };

  const initialPerType: Record<TOrder, IOrder> = {
    Siembra: {
      ...baseOrder,
      type: "Siembra",
      siembra: {
        tipoSemilla: "",
        cantidadSemillasHa: 0,
        cantidadHectareas: 0,
        fertilizante: "",
        distanciaSiembra: DISTANCIA_SIEMBRA.Cercana,
        fechaMaxSiembra: "",
        prioridad: "Media",
      },
    },
    Riego: {
      ...baseOrder,
      type: "Riego",
      riego: { metodo: RIEGOS.Aspersión, cantidadMm: 0, horas: 0 },
    },
    Fertilización: {
      ...baseOrder,
      type: "Fertilización",
      fertilizacion: { fertilizante: "", dosisKgHa: 0, metodo: "" },
    },
    Cosecha: {
      ...baseOrder,
      type: "Cosecha",
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
  };
};

export default useOrders;
