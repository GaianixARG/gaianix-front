// armar alert provider
import React, { createContext, useContext, useState } from "react";
import Alert from "../components/ui/Alert";
import type {
  FShowAlert,
  TAlert,
  TAlertContextProvider,
} from "../constants/types";

const AlertContext = createContext<TAlertContextProvider | undefined>(
  undefined
);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alerts, setAlerts] = useState<Array<TAlert>>([]);

  const showAlert: FShowAlert = (alert: TAlert) => {
    alert.id = `alert-${Date.now()}`;
    setAlerts((prev) => [...prev, { ...alert }]);
  };

  const dismissAlert = (id?: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert, dismissAlert }}>
      {children}
      <div className="fixed bottom-0 right-1 p-4">
        {alerts.map((alert) => (
          <Alert
            {...alert}
            key={alert.id}
            onClose={() => dismissAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
