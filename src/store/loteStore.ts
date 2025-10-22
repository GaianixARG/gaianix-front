import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ILote } from '../constants/interfaces'
import { withLoading } from './middlewares/withLoading'
import { infoCampoService } from '../services/infoCamposService'

export type TLoteState = {
  lotes: ILote[]
  fetchLotes: () => Promise<boolean>
}

export const useLoteStore = create<TLoteState>()(
  immer(
    withLoading(
      (set) => (
        {
          lotes: [],

          fetchLotes: async () => {
            try {
              const response = await infoCampoService.getAllLotes()
              set({ lotes: response.data })
              return true
            } catch {
              return false
            }
          }
        }
      )
    )
  ),
)