import { useEffect, useState } from "react";
import type { IDashboard } from "../constants/interfaces";
import {dashboardService} from "../services/dashboardService";
import type { FLoading, FShowAlert } from "../constants/types";

const initialDashboardData: IDashboard = {
  summary: [],
  orders: [],
  recentActivities: [],
};

const useDashboard = (setLoading: FLoading, showAlert: FShowAlert) => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const data = await dashboardService.getDashboardData();
        setDashboardData(data);
      } catch {
        showAlert({
          type: "error",
          message: "Error al cargar los datos",
        })
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [setLoading, showAlert]);

  return { dashboardData };
};

export default useDashboard;
