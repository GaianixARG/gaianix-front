import KanbanColumn from "../components/Ordenes/KanbanColumn";
import useOrders from "../hooks/useOrders";
import Drawer from "../components/ui/Drawer/Drawer";
import { useEffect, useMemo } from "react";
import FormDetailsOrder from "../components/Ordenes/FormDetailsOrder";
import { getArrayFromEnum } from "../constants/utils";
import { EStatus, type EOrderType } from "../constants/enums";
import type { IOrderDetails } from "../constants/interfaces";
import useButton from "../hooks/useButton";
import { useOrderStore } from "../store/orderStore";
import { useLoteStore } from "../store/loteStore";

type Props = {
  title: string;
  type: EOrderType;
};

const KanbanLayout = ({ title, type }: Props) => {
  const fetchOrders = useOrderStore(state => state.fetchOrders)
  const resetOrders = useOrderStore(state => state.resetOrders)
  useEffect(() => {
    fetchOrders(type)
    return () => {
      resetOrders()
    }
  }, [type, fetchOrders, resetOrders])
  
  const fetchLotes = useLoteStore(state => state.fetchLotes)
  useEffect(() => {
    fetchLotes()
  }, [fetchLotes])

  const {
    handleDropOrder,
    getOrdersByStatus,
    addNewOrder,
    updateOrder
  } = useOrders();

  const { handleToggleDrawer } = useButton({
    dataDrawerTarget: "drawer-order",
  });
  const estados = useMemo(() => getArrayFromEnum(EStatus).map(x => x.value as EStatus), [])

  const handleCreateNewOrder = (order: IOrderDetails) => {
    addNewOrder(order)
    handleToggleDrawer("close")
  }

  const handleUpdateOrder = (order: IOrderDetails) => {
    updateOrder(order)
    handleToggleDrawer("close")
  }

  const selectOrder = useOrderStore(state => state.selectOrder)
  const onSelectOrder = (orderId: string) => {
    selectOrder(orderId)
    handleToggleDrawer("open")
  }

  return (
    <>
      <Drawer id="drawer-order" closeButton>
        <FormDetailsOrder
          key={`form_details_${type}`}
          type={type}
          onCreate={handleCreateNewOrder}
          onUpdate={handleUpdateOrder}
        />
      </Drawer>
      {title !== "" && <h1 className="text-2xl font-bold text-accent mb-6">{title}</h1>}
      <div className="grid grid-rows-3 xl:grid-cols-3 xl:grid-rows-1 gap-5 px-4">
        {estados.map((status) => {
          return <KanbanColumn
            key={status}
            status={status}
            orders={getOrdersByStatus(status)}
            onDropOrder={handleDropOrder}
            onSelectOrder={onSelectOrder}
          />
        })}
      </div>
    </>
  );
};

export default KanbanLayout;
