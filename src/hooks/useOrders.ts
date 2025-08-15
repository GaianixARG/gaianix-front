import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import type { FLoading, TOrder, TStatus } from "../constants/types";
import type { IOrder, IOrderBase } from "../constants/interfaces";
import { DISTANCIA_SIEMBRA, RIEGOS, STATUS } from "../constants/enums";
import { useAlert } from "../context/AlertProvider";
import { muestraFecha } from "../constants/utils";
import { useAuth } from "../context/AuthContext";

const _initialOrders: IOrder[] = [];

const useOrders = (type: TOrder, setLoading: FLoading) => {
  const { user } = useAuth();
  const { showAlert } = useAlert();
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

  const addNewOrder = (order: IOrder) => {
    const getNewId = () => {
      const maxId = orders.reduce(
        (max, curr) => (curr.id > max ? curr.id : max),
        "0"
      );
      return (parseInt(maxId) + 1).toString();
    };
    const getNewCodigo = () => {
      const codigoPrefix = order.type.charAt(0);
      const maxCodigo = orders.reduce(
        (max, curr) => (curr.codigo > max ? curr.codigo : max),
        codigoPrefix + "0000"
      );
      const numberCodigo = parseInt(maxCodigo.slice(1)) + 1;
      return codigoPrefix + numberCodigo.toString().padStart(4, "0");
    };
    const newOrder: IOrder = {
      ...order,
      id: getNewId(),
      codigo: getNewCodigo(),
      dateOfCreation: muestraFecha(new Date()),
      creator: user,
    };

    setOrders((prev) => [...prev, newOrder]);
    showAlert({
      type: "success",
      title: "Orden creada exitosamente",
      message: `${newOrder.codigo} - ${newOrder.title}`,
    });
  };

  const updateOrder = (updatedOrder: IOrder) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
    showAlert({
      type: "success",
      title: "Orden actualizada exitosamente",
      message: updatedOrder.codigo + " " + updatedOrder.title,
    });
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
    addNewOrder,
    updateOrder,
  };
};

export default useOrders;
