import {
  BADGESTYLE_X_STATUS,
  COLOR_PER_STATUS,
} from "../../constants/conversiones";
import type { IOrder } from "../../constants/interfaces";
import useCalendar from "../../hooks/useCalendar";

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
  const { muestraFecha, stringToDate } = useCalendar()

  const color = COLOR_PER_STATUS[status];
  return (
    <article
      className={`rounded-lg snap-center shadow-md p-4 shrink-0 w-[240px] xl:w-full min-h-[50px] cursor-grab active:cursor-grabbing hover:scale-105 ${BADGESTYLE_X_STATUS[color]}`}
      draggable
      onDragStart={(e) => {
        onDragStart?.(e, id);
      }}
      onClick={onClick}
    >
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className={`text-xs rounded-lg px-2 bg-accent-light text-white`}>
          {codigo}
        </span>
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-1">
        {lote.codigo} — {muestraFecha(stringToDate(dateOfCreation))}
      </p>
      <p className="text-xs italic">
        Creado por:{" "}
        <span className="font-medium text-accent">{creator.name || ""}</span>
      </p>
    </article>
  );
};

export default OrderCard;
