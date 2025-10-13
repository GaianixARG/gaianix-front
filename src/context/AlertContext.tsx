import { createContext, useContext } from "react";
import type {
  TAlertContextProvider,
} from "../constants/types";

export const AlertContext = createContext<TAlertContextProvider | undefined>(
  undefined
);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
