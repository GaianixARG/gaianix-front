import { useEffect, useState } from "react";
import type { IDashboard } from "../constants/interfaces";
import {dashboardService} from "../services/dashboardService";
import { useAlertStore } from "../store/alertStore";

const initialDashboardData: IDashboard = {
  summary: [],
  orders: [],
  recentActivities: [],
};

const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const showAlert = useAlertStore(state => state.showAlert)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch {
        showAlert({
          type: "error",
          message: "Error al cargar los datos",
        })
      }
    };

    fetchDashboardData();
  }, [showAlert]);

  return { ...dashboardData };
};

export default useDashboard;
