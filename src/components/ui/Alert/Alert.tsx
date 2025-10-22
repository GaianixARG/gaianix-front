import { CircleAlert, CircleCheck, CircleX, Info, X } from "lucide-react";
import { useCallback, useEffect } from "react";
import type { TAlert, TStatusColor } from "../../../constants/types";
import { ALERT_PER_STATUS_COLOR } from "../../../constants/conversiones";
import Button from "../Button";

const IconPerStatus = (type: TStatusColor) => {
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
};

const Alert = ({ id, type, message, onClose }: TAlert) => {
  const dismissible = onClose != null;
  const handleClose = useCallback(() => {
    if (dismissible && id != null) {
      if (onClose != null) {
        onClose();
      }
    }
    else if (id != null) {
      const $alertElement = document.getElementById(id);
      if ($alertElement) $alertElement.remove()
    }
  }, [dismissible, id, onClose]);

  const Icon = IconPerStatus(type)

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClose();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [handleClose]);

  return (
    <div
      id={id}
      className={`flex items-center bg-white gap-3 p-4 w-sm xl:w-lg mb-4 rounded-lg shadow-md ${ALERT_PER_STATUS_COLOR[type]}`}
      role="alert"
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span className="flex-1 overflow-ellipsis">
        <span className="text-sm">{message}</span>
      </span>
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
