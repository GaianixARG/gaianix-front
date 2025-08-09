import PrivateLayout from "../layouts/PrivateLayout";
import KanbanLayout from "../layouts/KanbanLayout";
import { ORDER_TYPES } from "../constants/enums";

const Fertilizacion = () => {
  return (
    <PrivateLayout>
      <KanbanLayout title="Fertilización" type={ORDER_TYPES.Fertilización} />
    </PrivateLayout>
  );
};

export default Fertilizacion;
