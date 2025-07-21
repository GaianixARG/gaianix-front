import { useEffect, useState } from "react";
import type { IDashboard } from "../constants/interfaces";
import { getDashboardData } from "../services/api";
import type { FLoading } from "../constants/types";

const initialDashboardData: IDashboard = {
  summary: [],
  orders: [],
  recentActivities: [],
};

const useDashboard = (setLoading: FLoading) => {
  const [dashboardData, setDashboardData] = useState(initialDashboardData);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const data = await getDashboardData();
      setDashboardData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { dashboardData };
};

export default useDashboard;
