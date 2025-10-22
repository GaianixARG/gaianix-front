import PrivateLayout from "../layouts/PrivateLayout";
import useDashboard from "../hooks/useDashboard";
import SummaryCard from "../components/Dashboard/SummaryCard";
import ActivityListItem from "../components/Dashboard/ActivityListItem";
import OrdersTable from "../components/Dashboard/OrdersTable";
import Carrousel from "../components/ui/Carrousel";

export default function Dashboard() {
  const { summary, orders, recentActivities } = useDashboard();

  return (
    <PrivateLayout>
      <div className="sm:p-6 space-y-10">
        {/* Cards resumen */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summary.map((item) => (
            <SummaryCard key={item.label} {...item} />
          ))}
        </section>

        {/* Carrusel */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-accent mb-4">
            Actividades recientes
          </h2>
          <Carrousel
            id="carousel-dashboard"
            tipo="static"
            data={recentActivities}
            component={ActivityListItem}
          />
        </section>

        {/* Tabla de órdenes */}
        <section>
          <h2 className="text-xl font-bold text-accent mb-4">
            Órdenes de trabajo
          </h2>
          <OrdersTable data={orders} />
        </section>

      </div>
    </PrivateLayout>
  );
}
