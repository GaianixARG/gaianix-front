import KanbanLayout from "../layouts/KanbanLayout";
import PrivateLayout from "../layouts/PrivateLayout";
import TabContentItem from "../components/ui/Tabs/TabContentItem";
import TabContent from "../components/ui/Tabs/TabContent";
import TabHeaderItem from "../components/ui/Tabs/TabHeaderItem";
import TabHeader from "../components/ui/Tabs/TabHeader";
import { Grid2x2Plus, Kanban } from "lucide-react";
import type { TabHeaderItemProps } from "../constants/types";
import SeedsPage from "../components/Semillas/SeedsPage";
import { EOrderType } from "../constants/enums";
import { useFertilizerStore } from "../store/fertilizerStore";
import { useSeedStore } from "../store/seedStore";
import { useEffect } from "react";

const TABS_SIEMBRA = {
  ORDERS: "orders-cards",
  SEEDS: "seeds-list",
};
const contentTabId = "siembra-tabs-content";

const tabsSiembra: TabHeaderItemProps[] = [
  {
    tabId: TABS_SIEMBRA.ORDERS,
    label: "Órdenes",
    icon: Kanban,
    isActive: true,
    contentTabId: contentTabId
  },
  {
    tabId: TABS_SIEMBRA.SEEDS,
    label: "Semillas",
    icon: Grid2x2Plus,
    isActive: false,
    contentTabId: contentTabId
  },
];

const Siembra = () => {
  const fetchFertilizers = useFertilizerStore(state => state.fetchFertilizers)
  useEffect(() => {
    fetchFertilizers()
  }, [fetchFertilizers])

  const fetchSeeds = useSeedStore(state => state.fetchSeeds)
  useEffect(() => {
    fetchSeeds()
  }, [fetchSeeds])

  return (
    <PrivateLayout>
        <TabHeader tabContentId={contentTabId}>
          {tabsSiembra.map((tab) => (
            <TabHeaderItem key={tab.tabId} {...tab} />
          ))}
        </TabHeader>
        <TabContent id={contentTabId} className="flex-1">
          <TabContentItem id={TABS_SIEMBRA.ORDERS} active>
            <KanbanLayout key={`kb_${EOrderType.Siembra}`} title="" type={EOrderType.Siembra} />
          </TabContentItem>
          <TabContentItem id={TABS_SIEMBRA.SEEDS}>
            <SeedsPage />
          </TabContentItem>
        </TabContent>
    </PrivateLayout>
  );
};

export default Siembra;
