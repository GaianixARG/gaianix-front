import PrivateLayout from "../layouts/PrivateLayout";
import KanbanLayout from "../layouts/KanbanLayout";
import { ORDER_TYPES } from "../constants/enums";

const Riego = () => {
  return (
    <PrivateLayout>
      <KanbanLayout title="Riego" type={ORDER_TYPES.Riego} />
    </PrivateLayout>
  );
};

export default Riego;
