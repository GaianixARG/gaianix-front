import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  tabContentId: string;
};

const TabHeader = ({ children, className, tabContentId }: Props) => {
  return (
    <ul
      className={`flex flex-wrap text-sm font-medium text-center text-gray-400 ${className}`}
      data-tabs-toggle={`#${tabContentId}`}
      role="tablist"
    >
      {children}
    </ul>
  );
};

export default TabHeader;
