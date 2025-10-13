import { createContext, useContext } from "react";
import type { TLoadingContextProvider } from "../constants/types";

export const LoadingContext = createContext<TLoadingContextProvider | undefined>(
  undefined
);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within LoadingProvider");
  return context;
};
