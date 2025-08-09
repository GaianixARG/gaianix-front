import KanbanColumn from "../components/Ordenes/KanbanColumn";
import useOrders from "../hooks/useOrders";
import { useLoading } from "../context/LoadingContext";
import type { TOrder, TStatus } from "../constants/types";
import { STATUS } from "../constants/enums";
import Drawer from "../components/ui/Drawer";
import { useState } from "react";
import FormDetailsOrder from "../components/Ordenes/FormDetailsOrder";

type Props = {
  title: string;
  type: TOrder;
};

const KanbanLayout = ({ title, type }: Props) => {
  const { setLoading } = useLoading();
  const { handleDropOrder, getOrdersByStatus, newOrder } = useOrders(
    type,
    setLoading
  );

  const [orderSelected, setOrderSelected] = useState(newOrder);
  const handleSelectOrder = (orderId: string, status: TStatus) => {
    const order = getOrdersByStatus(status).find((o) => o.id === orderId);
    if (order) setOrderSelected(order);
    else {
      newOrder.status = status;
      setOrderSelected(newOrder);
    }
  };

  return (
    <>
      <Drawer closeButton>
        <FormDetailsOrder order={orderSelected} />
      </Drawer>
      <h1 className="text-2xl font-bold text-accent mb-6">{title}</h1>
      <div className="flex justify-center h-full gap-6 p-4 grow-1">
        {Object.values(STATUS).map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            orders={getOrdersByStatus(status)}
            onDropOrder={handleDropOrder}
            onSelectOrder={handleSelectOrder}
          />
        ))}
      </div>
    </>
  );
};

export default KanbanLayout;
