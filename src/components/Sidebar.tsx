import { LogOut, Menu } from "lucide-react";
import logo from "../assets/images/logo.png";
import Button from "./ui/Button";
import { PRIVATE_ROUTES_ICONS } from "../constants/routes";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { logout, user, isAuthenticated } = useAuth();

  return (
    <header>
      <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Button
                dataDrawerTarget="logo-sidebar"
                className="inline-flex items-center p-2 text-smrounded-lg sm:hidden text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <Menu />
              </Button>
              <a
                href={isAuthenticated ? "/dashboard" : "/"}
                className="flex ms-2 md:me-24"
              >
                <img src={logo} className="h-12 me-3" alt="Gainaix Logo" />
                <span className="self-center text-10xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                  Gaianix
                </span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <span className="text-md font-semibold sm:text-lg text-secondary-light mr-3 italic">
                  {user.name}
                </span>
                <Button
                  className="inline-flex items-center p-2 font-bold py-2 px-6"
                  tipo="tertiary-light"
                  onClick={logout}
                >
                  <span className="hidden md:inline mr-3">Log Out</span>
                  <LogOut size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-50 h-screen pt-20 transition-transform -translate-x-full bg-accent sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {PRIVATE_ROUTES_ICONS.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <a
                  href={path}
                  className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group"
                >
                  <Icon
                    size={22}
                    className="shrink-0 mr-4 text-gray-400 transition duration-75 group-hover:text-white"
                    aria-hidden="true"
                  />
                  <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </header>
  );
};

export default Sidebar;
