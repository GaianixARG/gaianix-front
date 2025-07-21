import {
  BADGESTYLE_X_STATUS,
  COLOR_PER_STATUS,
} from "../../constants/conversiones";
import type { IOrder } from "../../constants/interfaces";

type OrderCardProps = IOrder & {
  onDragStart?: (e: React.DragEvent, orderId: string) => void;
};

const OrderCard = ({
  id,
  title,
  status,
  date,
  field,
  creator,
  onDragStart,
}: OrderCardProps) => {
  const color = COLOR_PER_STATUS[status];
  return (
    <div
      className={`rounded-lg shadow-md p-4 cursor-grab active:cursor-grabbing hover:scale-105  ${BADGESTYLE_X_STATUS[color]}`}
      draggable
      onDragStart={(e) => {
        onDragStart?.(e, id);
      }}
    >
      <h3 className="text-sm font-semibold mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground mb-1">
        {field} — {date}
      </p>
      <p className="text-xs italic">
        Creado por:{" "}
        <span className="font-medium text-accent">{creator.name || ""}</span>
      </p>
    </div>
  );
};

export default OrderCard;
