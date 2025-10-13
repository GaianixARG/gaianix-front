import React from "react";

type TabContentProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  active?: boolean;
};

const TabContentItem = ({
  id,
  className,
  children,
  active,
}: TabContentProps) => {
  return (
    <div
      className={`p-4 ${className ?? ""}`}
      id={id}
      role="tabpanel"
      aria-labelledby={`${id}-tab`}
      hidden={!(active ?? false)}
    >
      {children}
    </div>
  );
};

export default TabContentItem;
