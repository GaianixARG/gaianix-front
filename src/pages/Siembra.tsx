import KanbanLayout from "../layouts/KanbanLayout";
import { ORDER_TYPES } from "../constants/enums";
import PrivateLayout from "../layouts/PrivateLayout";
import TabsSiembra from "../components/Siembra/TabsSiembra";

const Siembra = () => {
  return (
    <PrivateLayout>
      <TabsSiembra />
      <KanbanLayout title="" type={ORDER_TYPES.Siembra} />
    </PrivateLayout>
  );
};

export default Siembra;
