import { createContext } from "react";
import type { TAuthContextType } from "../constants/types";

export const AuthContext = createContext<TAuthContextType | undefined>(undefined);
