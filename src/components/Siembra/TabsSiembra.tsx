import React from "react";
import TabHeader from "../ui/Tabs/TabHeader";
import { Grid2x2Plus, Kanban } from "lucide-react";
import type { TabHeaderItemProps } from "../../constants/types";
import TabHeaderItem from "../ui/Tabs/TabHeaderItem";
import TabContent from "../ui/Tabs/TabContent";
import TabContentItem from "../ui/Tabs/TabContentItem";

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
    contentTabId: contentTabId,
    onClick: () => {
      console.log("Tab clicked");
    },
  },
  {
    tabId: TABS_SIEMBRA.SEEDS,
    label: "Semillas",
    icon: Grid2x2Plus,
    isActive: false,
    contentTabId: contentTabId,
    onClick: () => {
      console.log("Tab clicked");
    },
  },
];

const TabsSiembra = () => {
  return (
    <>
      <TabHeader tabContentId={contentTabId}>
        {tabsSiembra.map((tab) => (
          <TabHeaderItem key={tab.tabId} {...tab} />
        ))}
      </TabHeader>
      <TabContent id={contentTabId} className="w-100">
        <TabContentItem id={TABS_SIEMBRA.ORDERS} active>
          <p className="text-sm text-gray-400">
            This is some placeholder content the{" "}
            <strong className="font-medium text-white">
              Contacts tab's associated content
            </strong>
            . Clicking another tab will toggle the visibility of this one for
            the next. The tab JavaScript swaps classNamees to control the
            content visibility and styling.
          </p>
        </TabContentItem>
        <TabContentItem id={TABS_SIEMBRA.SEEDS}>
          <p>COSI</p>
        </TabContentItem>
      </TabContent>
    </>
  );
};

export default TabsSiembra;
