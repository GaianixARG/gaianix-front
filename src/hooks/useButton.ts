import type { TFunctionToggle } from "../constants/types";

type TargetButton = {
  dataSidebarTarget?: string;
  dataDrawerTarget?: string;
  dataDropdownTarget?: string;
};

const useButton = ({
  dataSidebarTarget,
  dataDrawerTarget,
  dataDropdownTarget,
}: TargetButton) => {
  const handleToggleSidebar = (functionToggle?: TFunctionToggle) => {
    if (dataSidebarTarget) {
      const sidebar = document.getElementById(dataSidebarTarget);
      if (sidebar) {
        switch (functionToggle) {
          case "open":
            sidebar.classList.remove("-translate-x-full");
            break;
          case "close":
            sidebar.classList.add("-translate-x-full");
            break;
          case "toggle":
            sidebar.classList.toggle("-translate-x-full");
            break;
          default:
            sidebar.classList.toggle("-translate-x-full");
            break;
        }
      }
    }
  };

  const handleToggleDrawer = (functionToggle?: TFunctionToggle) => {
    if (dataDrawerTarget) {
      const drawer = document.getElementById(dataDrawerTarget);
      if (drawer) {
        switch (functionToggle) {
          case "open":
            drawer.classList.remove("translate-x-full");
            break;
          case "close":
            drawer.classList.add("translate-x-full");
            break;
          case "toggle":
            drawer.classList.toggle("translate-x-full");
            break;
          default:
            drawer.classList.toggle("translate-x-full");
            break;
        }
      }
    }
  };

  const handleOpenDropdown = () => {
    if (dataDropdownTarget) {
      const dropdown = document.getElementById(dataDropdownTarget);
      if (dropdown) {
        dropdown.classList.toggle("hidden");
      }
    }
  };

  return {
    handleToggleSidebar,
    handleToggleDrawer,
    handleOpenDropdown,
  };
};

export default useButton;
