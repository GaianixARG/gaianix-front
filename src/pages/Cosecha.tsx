import PrivateLayout from "../layouts/PrivateLayout";
import KanbanLayout from "../layouts/KanbanLayout";
import { ORDER_TYPES } from "../constants/enums";

const Cosecha = () => {
  return (
    <PrivateLayout>
      <KanbanLayout title="Cosecha" type={ORDER_TYPES.Cosecha} />
    </PrivateLayout>
  );
};

export default Cosecha;
