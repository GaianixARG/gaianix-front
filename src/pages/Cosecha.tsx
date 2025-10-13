import PrivateLayout from "../layouts/PrivateLayout";
import KanbanLayout from "../layouts/KanbanLayout";
import { EOrderType } from "../constants/enums";

const Cosecha = () => {
  return (
    <PrivateLayout>
      <KanbanLayout title="Cosecha" type={EOrderType.Cosecha} />
    </PrivateLayout>
  );
};

export default Cosecha;
