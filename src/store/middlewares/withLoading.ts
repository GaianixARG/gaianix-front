import type { StateCreator } from "zustand"
import { useLoadingStore } from "../loadingStore"

export const withLoading =
  <T extends object>(config: StateCreator<T>): StateCreator<T> =>
  (set, get, api) => {
    const wrappedSet = (fn: any) => set(fn)

    const state = config(wrappedSet, get, api)

    const wrappedState = Object.entries(state).reduce((acc, [key, value]) => {
      if (typeof value === "function") {
        // Si es una acción async, la envolvemos
        acc[key as keyof T] = (async (...args: any[]) => {
          const { setIsLoading } = useLoadingStore.getState()
          try {
            setIsLoading(true)
            const result = await value(...args)
            return result
          }
          finally {
            setIsLoading(false)
          }
        }) as any
      } else {
        acc[key as keyof T] = value
      }
      return acc
    }, {} as T)

    return wrappedState
  }
