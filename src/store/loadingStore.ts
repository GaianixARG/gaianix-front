import { create } from 'zustand'

export type TAlertState = {
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const useLoadingStore = create<TAlertState>()(
  (set, get) => (
    {
      isLoading: false,
      setIsLoading: (value: boolean) => {
        const { isLoading } = get()
        if (value === isLoading) return
        set({ isLoading: value })
      }
    }
  )
)