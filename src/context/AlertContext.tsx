import { createContext } from "react";
import type {
  TAlertContextProvider,
} from "../constants/types";

export const AlertContext = createContext<TAlertContextProvider | undefined>(
  undefined
);

