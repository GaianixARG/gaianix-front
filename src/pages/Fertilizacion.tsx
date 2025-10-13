import PrivateLayout from "../layouts/PrivateLayout";
import KanbanLayout from "../layouts/KanbanLayout";
import { EOrderType } from "../constants/enums";
import TabContent from "../components/ui/Tabs/TabContent";
import TabHeader from "../components/ui/Tabs/TabHeader";
import TabContentItem from "../components/ui/Tabs/TabContentItem";
import TabHeaderItem from "../components/ui/Tabs/TabHeaderItem";
import type { TabHeaderItemProps } from "../constants/types";
import { Grid2x2Plus, Kanban } from "lucide-react";
import FertilizersPage from "../components/Fertilizantes/FertilizersPage";

const TABS_FERTILIZACION = {
  ORDERS: "orders-cards",
  FERTILIZERS: "fertilizers-list",
};
const contentTabId = "fertilizacion-tabs-content";

const tabsSiembra: TabHeaderItemProps[] = [
  {
    tabId: TABS_FERTILIZACION.ORDERS,
    label: "Órdenes",
    icon: Kanban,
    isActive: true,
    contentTabId: contentTabId
  },
  {
    tabId: TABS_FERTILIZACION.FERTILIZERS,
    label: "Fertilizantes",
    icon: Grid2x2Plus,
    isActive: false,
    contentTabId: contentTabId
  },
];

const Fertilizacion = () => {
  return (
    <PrivateLayout>
      
      <TabHeader tabContentId={contentTabId}>
          {tabsSiembra.map((tab) => (
            <TabHeaderItem key={tab.tabId} {...tab} />
          ))}
        </TabHeader>
        <TabContent id={contentTabId} className="flex-1">
          <TabContentItem id={TABS_FERTILIZACION.ORDERS} active>
            <KanbanLayout title="" type={EOrderType.Fertilizacion} />
          </TabContentItem>
          <TabContentItem id={TABS_FERTILIZACION.FERTILIZERS}>
            <FertilizersPage />
          </TabContentItem>
        </TabContent>
    </PrivateLayout>
  );
};

export default Fertilizacion;
