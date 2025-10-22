import { create } from 'zustand'
import type { FShowAlert, TAlert } from '../constants/types'
import { immer } from 'zustand/middleware/immer'

export type TAlertState = {
  alerts: TAlert[]
  showAlert: FShowAlert
  dismissAlert: (id?: string) => void
}

export const useAlertStore = create<TAlertState>()(
  immer(
    (set) => (
      {
        alerts: [],
        showAlert: (alert: TAlert) => {
          alert.id = `alert-${Date.now()}`
        
          set(state => ({ alerts: [...state.alerts, alert] }))
        },
        dismissAlert(id) {
          set(state => ({ alerts: state.alerts.filter((alert) => alert.id !== id) }))
        }
      }
    )
  )
)