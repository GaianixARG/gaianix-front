import type { IOrder } from "../../constants/interfaces";
import { FilterIcon, PlusIcon, SortAscIcon } from "lucide-react";
import OrderCard from "./OrderCard";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useAlert } from "../../context/AlertContext";
import { useState } from "react";
import {
  BG_PER_STATUS_COLOR,
  COLOR_PER_STATUS,
  STATUS_NAME,
  TEXT_PER_STATUS_COLOR,
} from "../../constants/conversiones";
import { EStatus } from "../../constants/enums";

type Props = {
  status: EStatus;
  orders: IOrder[];
  onDropOrder: (orderId: string, newStatus: EStatus) => void;
  onSelectOrder: (orderId: string, status: EStatus) => void;
};

const KanbanColumn = ({
  status,
  orders,
  onDropOrder,
  onSelectOrder,
}: Props) => {
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
  const bgContainer = `p-4 rounded-xl shadow-md transition-colors w-full min-w-0 ${
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
          <Badge
            color="accent"
            label={orders.length.toFixed(0)}
            className="py-1"
          />
          <span className={claseTextoTituloColumna}>{STATUS_NAME[status]}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            tipo="white"
            className="p-1"
            onClick={() => onSelectOrder("", status)}
            title="Crear nueva orden"
          >
            <PlusIcon className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                message: "Ordenar - Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Ordenar"
          >
            <SortAscIcon className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            tipo="white"
            className="p-1"
            onClick={() =>
              showAlert({
                message: "Filtrar - Funcionalidad en desarrollo.",
                type: "error",
              })
            }
            title="Filtrar"
          >
            <FilterIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="
      overflow-x-auto xl:overflow-x-visible   /* scroll horizontal en mobile */
      xl:overflow-y-auto                      /* scroll vertical en XL */
      max-h-[90vh]                             /* limite de altura de la columna, ajustable */
      p-3
      snap-x xl:snap-y">
        <div className="
        flex flex-row xl:flex-col gap-3
        min-w-full xl:min-w-0
        snap-mandatory">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
              onDragStart={handleDragStart}
              onClick={() => onSelectOrder(order.id, status)}
            />
          ))
        ) : (
          <p className="text-xs text-muted-foreground italic">Sin órdenes</p>
          )}
          </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
