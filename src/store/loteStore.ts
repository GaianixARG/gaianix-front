import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ILote } from '../constants/interfaces'
import { withLoading } from './middlewares/withLoading'
import { infoCampoService } from '../services/infoCamposService'

export type TLoteState = {
  lotes: ILote[]
  selectedLoteId: string;
  editingLoteId: string | null;
  setSelectedLote: (id: string) => void
  setEditingLoteId: (id: string | null) => void
  createLote: (lote: ILote) => Promise<ILote | null>
  updateLote: (lote: ILote) => Promise<boolean>
  removeLote: (id: string) => Promise<boolean>
  fetchLotes: () => Promise<boolean>
}

export const INITIAL_SELECTED_LOTE_ID = ""
export const CREATE_LOTE_ID_VALUE = "0"

export const useLoteStore = create<TLoteState>()(
  immer(
    withLoading(
      (set, get) => (
        {
          lotes: [],
          selectedLoteId: INITIAL_SELECTED_LOTE_ID,
          editingLoteId: null,
          setSelectedLote: (id: string) => set({ selectedLoteId: id }),
          setEditingLoteId: (id: string | null) => set({ editingLoteId: id }),
          createLote: async (lote: ILote) => {
            try {
              const { lotes } = get()
              if (lotes.length > 0) lote.campo = lotes[0].campo
              const newLote = (await infoCampoService.createLote(lote)).data
              set(state => ({ lotes: [...state.lotes, newLote] }))
              return newLote
            } catch {
              return null
            }
          },
          updateLote: async (lote: ILote) => {
            const { lotes } = get()
            const newLotes = structuredClone(lotes)
            const index = newLotes.findIndex(l => l.id === lote.id)
            if (index !== -1) {
              newLotes[index] = lote
            }
            set({ lotes: newLotes })

            return true
          },
          removeLote: async (id: string) => {
            set(
              (state) => ({
                lotes: state.lotes.filter(l => l.id !== id)
              })
            )

            return true
          },
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