import useOrders from "../hooks/useOrders";
import { ORDER_TYPES } from "../constants/enums";
import PrivateLayout from "../layouts/PrivateLayout";
import { useLoading } from "../context/LoadingContext";
import KanbanColumn from "../components/Ordenes/KanbanColumn";

const Orders = () => {
  // const { setLoading } = useLoading();
  // const { getOrdersByType, handleDropOrder } = useOrders(setLoading);

  // return (
  //   <PrivateLayout>
  //     <h1 className="text-2xl font-bold text-accent mb-6">
  //       Órdenes de Trabajo
  //     </h1>
  //     <div className="flex gap-6 h-full w-full p-4">
  //       {Object.values(ORDER_TYPES).map((type) => (
  //         <KanbanColumn
  //           key={type}
  //           type={type}
  //           orders={getOrdersByType(type)}
  //           onDropOrder={handleDropOrder}
  //         />
  //       ))}
  //     </div>
  //   </PrivateLayout>
  // );
  return <></>;
};

export default Orders;
