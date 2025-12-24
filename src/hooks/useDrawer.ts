import { useState } from "react"
import type { TFunctionToggle } from "../constants/types";

export const useDrawer = (refDrawer: React.RefObject<HTMLDivElement | null>) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleDrawer = (el: HTMLDivElement, functionToggle?: TFunctionToggle) => {
    switch (functionToggle) {
      case "open":
        el.classList.remove("translate-x-full");
        setIsDrawerOpen(true)
        break;
      case "close":
        el.classList.add("translate-x-full");
        setIsDrawerOpen(false)
        break;
      case "toggle":
      default:
        el.classList.toggle("translate-x-full");
        setIsDrawerOpen(!isDrawerOpen)
        break;
    }
  }

  const toggleDrawer = (functionToggle?: TFunctionToggle) => {
    if (refDrawer.current) handleDrawer(refDrawer.current, functionToggle)
  }

  return {
    isDrawerOpen,
    toggleDrawer
  }
}