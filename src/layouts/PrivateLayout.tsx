import Sidebar from "../components/ui/Sidebar";
import ProtectedRoute from "../routes/ProtectedRoute";

type Props = {
  children: React.ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  return (
    <ProtectedRoute to="/login">
      <Sidebar />
      <main className="flex flex-col items-center bg-linear-(--color-background) min-h-screen h-full sm:ml-50 sm:px-4 py-15 mt-10 min-w-fit">
        {children}
      </main>
    </ProtectedRoute>
  );
};

export default PrivateLayout;
