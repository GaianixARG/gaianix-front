import KanbanLayout from "../layouts/KanbanLayout";
import { ORDER_TYPES } from "../constants/enums";
import PrivateLayout from "../layouts/PrivateLayout";

const Siembra = () => {
  return (
    <PrivateLayout>
      <KanbanLayout title="Siembra" type={ORDER_TYPES.Siembra} />
    </PrivateLayout>
  );
};

export default Siembra;
