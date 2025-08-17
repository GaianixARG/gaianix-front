import React from "react";

type Props = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

const TabContent = ({ id, className, children }: Props) => {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
};

export default TabContent;
