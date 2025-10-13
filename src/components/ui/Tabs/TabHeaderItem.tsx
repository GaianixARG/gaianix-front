import type { TabHeaderItemProps } from "../../../constants/types";

const TabHeaderItem = ({
  tabId,
  label,
  icon: Icon,
  isActive,
  contentTabId,
  onClick,
}: TabHeaderItemProps) => {
  const className = `inline-flex items-center px-4 py-3 hover:bg-green-700/30 rounded-lg text-accent aria-selected:text-white aria-selected:bg-green-700/50`;

  const buttonTabId = `${tabId}-tab`;
  const handleToggleTab = () => {
    const targetTab = document.getElementById(buttonTabId);
    if (!targetTab) return;
    const tabList = targetTab.closest("[role='tablist']");
    if (!tabList) return;

    tabList.querySelectorAll('[role="tab"]').forEach((t) => {
      t.setAttribute("aria-selected", t.id === buttonTabId ? "true" : "false");
    });

    const contentTab = document.getElementById(contentTabId);
    if (!contentTab) return;

    contentTab.querySelectorAll('[role="tabpanel"]').forEach((p) => {
      if (p.id === tabId) p.removeAttribute("hidden");
      else p.setAttribute("hidden", "true");
    });
    if (onClick != null) onClick();
  };

  return (
    <li className="me-2" role="presentation">
      <button
        id={buttonTabId}
        className={className}
        role="tab"
        type="button"
        aria-controls={tabId}
        aria-selected={isActive}
        data-tabs-target={`#${tabId}`}
        onClick={handleToggleTab}
      >
        {Icon && <Icon className="w-4 h-4 me-2" aria-hidden="true" />}
        {label}
      </button>
    </li>
  );
};

export default TabHeaderItem;
