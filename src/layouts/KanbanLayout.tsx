import KanbanColumn from "../components/Ordenes/KanbanColumn";
import useOrders from "../hooks/useOrders";
import { useLoading } from "../context/LoadingContext";
import type { TOrder } from "../constants/types";
import { STATUS } from "../constants/enums";

type Props = {
  title: string;
  type: TOrder;
};

const KanbanLayout = ({ title, type }: Props) => {
  const { setLoading } = useLoading();
  const { handleDropOrder, getOrdersByStatus } = useOrders(type, setLoading);

  return (
    <div className="flex flex-col items-center h-full w-full">
      <h1 className="text-2xl font-bold text-accent mb-6">{title}</h1>
      <div className="flex justify-center h-full gap-6 p-4">
        {Object.values(STATUS).map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            orders={getOrdersByStatus(status)}
            onDropOrder={handleDropOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanLayout;
