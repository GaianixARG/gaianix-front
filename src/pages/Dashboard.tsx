import { useEffect } from "react";
import PrivateLayout from "../layouts/PrivateLayout";
import useDashboard from "../hooks/useDashboard";
import { useLoading } from "../context/LoadingContext";
import SummaryCard from "../components/Dashboard/SummaryCard";
import ActivityListItem from "../components/Dashboard/ActivityListItem";
import OrdersTable from "../components/Dashboard/OrdersTable";
import Carrousel from "../components/ui/Carrousel";

export default function Dashboard() {
  const { setLoading } = useLoading();
  const { dashboardData } = useDashboard(setLoading);

  const { summary, orders, recentActivities } = dashboardData;

  return (
    <PrivateLayout>
      <div className="p-6 md:p-10 space-y-10">
        {/* Cards resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((item) => (
            <SummaryCard key={item.label} {...item} />
          ))}
        </div>

        {/* Carrusel */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-accent mb-4">
            Actividades recientes
          </h2>
          <Carrousel
            id="carousel-dashboard"
            tipo="static"
            data={recentActivities}
            component={ActivityListItem}
          />
        </div>

        {/* Tabla de órdenes */}
        <div>
          <h2 className="text-xl font-bold text-accent mb-4">
            Órdenes de trabajo
          </h2>
          <OrdersTable data={orders} />
        </div>
      </div>
    </PrivateLayout>
  );
}
