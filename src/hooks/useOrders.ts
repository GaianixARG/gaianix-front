import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import type { FLoading, TOrder, TStatus } from "../constants/types";
import type { IOrder } from "../constants/interfaces";

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

  return { orders, getOrdersByStatus, handleDropOrder };
};

export default useOrders;
