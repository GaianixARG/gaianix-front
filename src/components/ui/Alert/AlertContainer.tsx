import { useAlertStore } from "../../../store/alertStore"
import Alert from "./Alert"

const AlertContainter = () => {
  const alerts = useAlertStore(state => state.alerts)
  const dismissAlert = useAlertStore(state => state.dismissAlert)

  const handleCloseAlert = (id?: string) => () => dismissAlert(id)

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 p-4 z-[101]">
      {alerts.map((alert) => (
        <Alert
          {...alert}
          key={alert.id}
          onClose={handleCloseAlert(alert.id)}
        />
      ))}
    </div>
  )
}

export default AlertContainter