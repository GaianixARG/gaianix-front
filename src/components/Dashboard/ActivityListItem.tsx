import type { IRecentActivity } from "../../constants/interfaces";
import { muestraFecha } from "../../constants/utils";

const ActivityListItem = ({ title, description, date }: IRecentActivity) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-70 sm:w-100">
      <p className="text-sm text-muted-foreground mb-1">{muestraFecha(date)}</p>
      <p className="text-base font-semibold text-primary">{title}</p>
      <p className="text-sm text-neutral-700">{description}</p>
    </div>
  );
};

export default ActivityListItem;
