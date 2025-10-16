import { LogOut, Menu } from "lucide-react";
import Button from "../Button";
import logo from "../../../assets/images/logo.png";
import { PRIVATE_ROUTES_ICONS } from "../../../constants/routes";
import NavTab from "./NavTab";
import useAuth from "../../../hooks/context/useAuth";

const Sidebar = () => {
  const { handleLogout, user, isAuthenticated } = useAuth();
  return (
    <header className="min-w-full">
      <div className="bg-accent p-2 sm:p-0 sm:hidden flex items-center">
        <Button
          dataSidebarTarget="logo-sidebar"
          className="inline-flex items-center p-2 text-sm rounded-lg text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <Menu />
        </Button>
      </div>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800">
          <a
            href={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center ps-2.5 mb-5"
          >
            <img src={logo} className="h-12 me-3" alt="Gainaix Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Gaianix
            </span>
          </a>
          {isAuthenticated && (
            <p className="p-2 mb-5 bg-primary/40 rounded-lg text-white text-center">
              {user.name}
            </p>
          )}

          {Object.entries(PRIVATE_ROUTES_ICONS).map(([group, routes], idx) => (
            <ul key={`nav-${group}`} className={`space-y-2 font-medium pt-4 mt-4 ${idx > 0 && "border-t border-gray-700"}`}>
                {routes.map((route) =>
                    (  
                      <li key={route.path}>
                        <NavTab {...route} />
                      </li> 
                    )
                  )
                }
            </ul>
          ))}
         
          <ul className="font-medium pt-4 mt-4 space-y-2 border-t border-gray-700">
            <li>
              <NavTab
                path="#"
                label="Desconectarse"
                enabled={isAuthenticated}
                icon={LogOut}
                onClick={handleLogout}
              />
            </li>
          </ul>
        </div>
      </aside>
    </header>
  );
};

export default Sidebar;
