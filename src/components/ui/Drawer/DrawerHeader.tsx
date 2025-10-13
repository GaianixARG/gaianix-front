import React from "react";

type Props = {
  children: React.ReactNode;
};

const DrawerHeader = ({ children }: Props) => {
  return (
    <h5
      id="drawer-label"
      className="inline-flex items-center text-base pb-4 font-semibold text-white uppercase border-b border-gray-600"
    >
      {children}
    </h5>
  );
};

export default DrawerHeader;
