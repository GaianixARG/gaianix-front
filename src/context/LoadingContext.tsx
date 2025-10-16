import { createContext } from "react";
import type { TLoadingContextProvider } from "../constants/types";

export const LoadingContext = createContext<TLoadingContextProvider | undefined>(
  undefined
);
