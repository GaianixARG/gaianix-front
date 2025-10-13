import KanbanColumn from "../components/Ordenes/KanbanColumn";
import useOrders from "../hooks/useOrders";
import { useLoading } from "../context/LoadingContext";
import Drawer from "../components/ui/Drawer/Drawer";
import { useMemo, useState } from "react";
import FormDetailsOrder from "../components/Ordenes/FormDetailsOrder";
import { useAlert } from "../context/AlertContext";
import { getArrayFromEnum, setDeepValue } from "../constants/utils";
import { EStatus, type EOrderType } from "../constants/enums";
import useButton from "../hooks/useButton";
import type { IOrderDetails } from "../constants/interfaces";

type Props = {
  title: string;
  type: EOrderType;
};

const KanbanLayout = ({ title, type }: Props) => {
  const { setLoading } = useLoading();
  const { showAlert } = useAlert()
  const {
    handleDropOrder,
    getOrdersByStatus,
    newOrder,
    addNewOrder,
    updateOrder
  } = useOrders(type, setLoading, showAlert);

  const { handleToggleDrawer } = useButton({
    dataDrawerTarget: "drawer-order",
  });
  const estados = useMemo(() => getArrayFromEnum(EStatus).map(x => x.value as EStatus), [])

  const [orderSelected, setOrderSelected] = useState(newOrder);
  const handleSelectOrder = (orderId: string, status: EStatus) => {
    const order = getOrdersByStatus(status).find((o) => o.id === orderId);
    if (order) setOrderSelected(order);
    else {
      newOrder.status = status;
      setOrderSelected(newOrder);
    }
    handleToggleDrawer("open");
  };

  const handleChangeProperty = (property: string, value: any) => {
    setOrderSelected((prev) => setDeepValue(prev, property, value));
  };

  const handleCreateNewOrder = (order: IOrderDetails) => {
    addNewOrder(order)
    handleToggleDrawer("close")
  }

  return (
    <>
      <Drawer id="drawer-order" closeButton>
        <FormDetailsOrder
          order={orderSelected}
          onChangeValue={handleChangeProperty}
          onCreate={handleCreateNewOrder}
          onUpdate={updateOrder}
        />
      </Drawer>
      {title !== "" && <h1 className="text-2xl font-bold text-accent mb-6">{title}</h1>}
      <div className="grid grid-rows-3 xl:grid-cols-3 xl:grid-rows-1 gap-5 px-4 w-full h-full">
        {estados.map((status) => {
          return <KanbanColumn
            key={status}
            status={status}
            orders={getOrdersByStatus(status)}
            onDropOrder={handleDropOrder}
            onSelectOrder={handleSelectOrder}
          />
        })}
      </div>
    </>
  );
};

export default KanbanLayout;
