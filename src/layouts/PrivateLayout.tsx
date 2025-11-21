import Sidebar from "../components/ui/SideBar/Sidebar";
import ProtectedRoute from "../routes/ProtectedRoute";

type Props = {
  children: React.ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  return (
    <ProtectedRoute to="/login">
      <Sidebar />
      <main className="flex flex-col gap-4 sm:ml-64 h-full flex-1 p-5 sm:p-10">
        {children}
      </main>
    </ProtectedRoute>
  );
};

export default PrivateLayout;
