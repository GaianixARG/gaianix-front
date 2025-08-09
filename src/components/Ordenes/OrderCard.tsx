import {
  BADGESTYLE_X_STATUS,
  COLOR_PER_STATUS,
} from "../../constants/conversiones";
import type { IOrder } from "../../constants/interfaces";
import Badge from "../ui/Badge";

type OrderCardProps = IOrder & {
  onDragStart?: (e: React.DragEvent, orderId: string) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const OrderCard = ({
  id,
  codigo,
  title,
  status,
  dateOfCreation,
  lote,
  creator,
  onDragStart,
  onClick,
}: OrderCardProps) => {
  const color = COLOR_PER_STATUS[status];
  return (
    <div
      className={`rounded-lg shadow-md p-4 cursor-grab active:cursor-grabbing hover:scale-105 ${BADGESTYLE_X_STATUS[color]}`}
      draggable
      onDragStart={(e) => {
        onDragStart?.(e, id);
      }}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs rounded-lg px-2 bg-accent-light text-white`}>
          {codigo}
        </span>
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-1">
        {lote} — {dateOfCreation}
      </p>
      <p className="text-xs italic">
        Creado por:{" "}
        <span className="font-medium text-accent">{creator.name || ""}</span>
      </p>
    </div>
  );
};

export default OrderCard;
