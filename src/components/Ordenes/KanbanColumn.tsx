import type { IOrder } from "../../constants/interfaces";
import type { TStatus } from "../../constants/types";
import { FilterIcon, PlusIcon, SortAscIcon } from "lucide-react";
import OrderCard from "./OrderCard";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useAlert } from "../../context/AlertProvider";
import { useState } from "react";
import {
  BG_PER_STATUS_COLOR,
  COLOR_PER_STATUS,
  TEXT_PER_STATUS_COLOR,
} from "../../constants/conversiones";

type Props = {
  status: TStatus;
  orders: IOrder[];
  onDropOrder: (orderId: string, newStatus: TStatus) => void;
};

const KanbanColumn = ({ status, orders, onDropOrder }: Props) => {
  const { showAlert } = useAlert();
  const [isActive, setIsActive] = useState(false);

  const createElementForDragImage = (e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    const dragImage = target.cloneNode(true) as HTMLElement;
    dragImage.style.position = "absolute";
    dragImage.style.width = "240px";
    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  };

  const handleDragStart = (e: React.DragEvent, orderId: string) => {
    e.dataTransfer.setData("orderId", orderId);
    createElementForDragImage(e);
  };

  const handleDropEnd = (e: React.DragEvent) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData("orderId");
    if (orderId) onDropOrder(orderId, status);

    setIsActive(false);
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsActive(true);
  };

  const handleOnDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsActive(false);
  };

  const colorStatus = COLOR_PER_STATUS[status];

  const claseTextoTituloColumna = `uppercase ${TEXT_PER_STATUS_COLOR[colorStatus]} font-bold me-1`;
  const bgContainer = `p-4 rounded-xl w-72 shadow-md transition-colors shrink-0 ${
    isActive ? BG_PER_STATUS_COLOR[colorStatus] : "bg-gray-200/50"
  }`;

  return (
    <div
      className={bgContainer}
      onDragOver={handleOnDragOver}
      onDragLeave={handleOnDragLeave}
      onDrop={handleDropEnd}
    >
      <div className="flex items-center justify-between mb-4 bg-white text-sm font-semibold p-2 rounded-full">
        <div className="flex items-center gap-2">
          <Badge color="accent" label={orders.length.toFixed(0)} />
          <span className={claseTextoTituloColumna}>{status}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                title: "Crear nueva orden",
                message: "Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Ordenar"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>

          <Button
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                title: "Ordenar",
                message: "Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Ordenar"
          >
            <SortAscIcon className="w-4 h-4" />
          </Button>

          <Button
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                title: "Filtrar",
                message: "Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Filtrar"
          >
            <FilterIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3 w-full h-full">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
              onDragStart={handleDragStart}
            />
          ))
        ) : (
          <p className="text-xs text-muted-foreground italic">Sin órdenes</p>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
