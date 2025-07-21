import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../routes/ProtectedRoute";

type Props = {
  children: React.ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  return (
    <ProtectedRoute to="/login">
      <Sidebar />
      <main className="flex flex-col items-center justify-center bg-linear-(--color-background) min-h-screen h-screen sm:ml-50 px-4 py-15 mt-10 min-w-fit">
        {children}
      </main>
    </ProtectedRoute>
  );
};

export default PrivateLayout;
