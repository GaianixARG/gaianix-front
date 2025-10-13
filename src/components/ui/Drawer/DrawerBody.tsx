import React, { type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLFormElement>;

const DrawerBody = ({ children, onSubmit }: Props) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default DrawerBody;
