import { useState } from "react";
import type { FShowAlert, TAlert } from "../constants/types";
import { AlertContext } from "../context/AlertContext";
import Alert from "../components/ui/Alert";

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
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 z-[101]">
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