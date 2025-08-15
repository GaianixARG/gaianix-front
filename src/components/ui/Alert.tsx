import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import type { TAlert } from "../../constants/types";
import Button from "./Button";
import { ALERT_PER_STATUS_COLOR } from "../../constants/conversiones";
import { useEffect } from "react";

const Alert = ({ id, type, title, message, onClose }: TAlert) => {
  const dismissible = onClose != null;
  const handleClose = () => {
    if (dismissible && id) {
      const alertElement = document.getElementById(id);
      if (alertElement) {
        alertElement.style.display = "none";
      }
      if (onClose) {
        onClose();
      }
    }
  };

  const Icon = (() => {
    switch (type) {
      case "error":
        return CircleX; // Replace with actual error icon
      case "success":
        return CircleCheck; // Replace with actual success icon
      case "warning":
        return CircleAlert; // Replace with actual warning icon
      case "info":
        return Info; // Replace with actual info icon
      default:
        return null;
    }
  })();

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      id={id}
      className={`flex items-center bg-white/75 gap-5 p-4 w-lg mb-4 rounded-lg shadow-md ${ALERT_PER_STATUS_COLOR[type]} z-9999`}
      role="alert"
    >
      {Icon && <Icon className="w-5 h-5" />}
      <div>
        <span className="font-medium">{title}</span>
        {message}
      </div>
      {dismissible && (
        <Button
          tipo={type}
          className="ms-auto -mx-1.5 -my-1.5 p-1.5"
          aria-label="Close"
          onClick={handleClose}
        >
          <span className="sr-only">Close</span>
          <X className="w-3 h-3" />
        </Button>
      )}
    </div>
  );
};

export default Alert;
