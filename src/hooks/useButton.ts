import { useCallback, useEffect } from "react";
import type { TFunctionToggle } from "../constants/types";

type TargetButton = {
  idButton?: string;
  dataSidebarTarget?: string;
  dataDrawerTarget?: string;
  dataDropdownTarget?: string;
};

const useButton = ({
  idButton,
  dataSidebarTarget,
  dataDrawerTarget,
  dataDropdownTarget,
}: TargetButton) => {
  const handleToggleSidebar = useCallback((functionToggle?: TFunctionToggle) => {
    if (dataSidebarTarget != null) {
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
  }, [dataSidebarTarget]);

  const handleToggleDrawer = (functionToggle?: TFunctionToggle) => {
    if (dataDrawerTarget != null) {
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
    if (dataDropdownTarget != null) {
      const dropdown = document.getElementById(dataDropdownTarget);
      if (dropdown) {
        dropdown.classList.toggle("hidden");
      }
    }
  };

  useEffect(() => {
    if (dataSidebarTarget != null && idButton != null) {
      document.body.addEventListener("click", (event) => {
        const sidebar = document.getElementById(dataSidebarTarget);
        const button = document.getElementById(idButton);
        if (
          sidebar &&
          button &&
          !button.contains(event.target as Node) &&
          !sidebar.contains(event.target as Node)
        ) {
          handleToggleSidebar("close");
        }
      });
    }
  }, [dataSidebarTarget, handleToggleSidebar, idButton]);

  return {
    handleToggleSidebar,
    handleToggleDrawer,
    handleOpenDropdown,
  };
};

export default useButton;
