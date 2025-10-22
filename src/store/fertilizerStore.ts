import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { IFertilizer } from '../constants/interfaces'
import { withLoading } from './middlewares/withLoading'
import { fertilizerService } from '../services/fertilizerService'

export type TFertilizerState = {
  fertilizers: IFertilizer[]
  fertilizerSelected: number
  fetchFertilizers: () => Promise<boolean>
  selectFertilizer: (fertilizerId: string) => void
  createNewFertilizer: (fertilizer: IFertilizer) => Promise<IFertilizer | null>
  updateFertilizer: (fertilizer: IFertilizer) => Promise<boolean>
  deleteFertilizer: (fertilizerId: string) => Promise<boolean>
}

export const useFertilizerStore = create<TFertilizerState>()(
  immer(
    withLoading(
      (set, get) => (
        {
          fertilizers: [],
          fertilizerSelected: -1,

          fetchFertilizers: async () => {
            try {
              const response = await fertilizerService.getAll()
              set({ fertilizers: response.data })

              return true
            } catch {
              return false
            }
          },

          selectFertilizer: (fertilizerId: string) => {
            set(state => ({ fertilizerSelected: state.fertilizers.findIndex(f => f.id == fertilizerId) }))
          },

          createNewFertilizer: async (fertilizer: IFertilizer) => {
            try {
              const newFert = (await fertilizerService.create(fertilizer)).data
              set(state => ({ fertilizers: [...state.fertilizers, newFert] }))
              return newFert
            } catch {
              return null
            }
          },

          updateFertilizer: async (fertilizer: IFertilizer) => {
            try {
              await fertilizerService.update(fertilizer.id, fertilizer)
              
              const { fertilizers } = get()
              const newFertilizers = structuredClone(fertilizers)
              const idxFertilizer = newFertilizers.findIndex(f => f.id === fertilizer.id)
              if (idxFertilizer === -1) return false
            
              newFertilizers[idxFertilizer] = fertilizer

              set({ fertilizers: newFertilizers })
              return true
            } catch {
              return false
            }
          },

          deleteFertilizer: async (id: string) => {
            try {
              fertilizerService.remove(id)
              set(state => ({ fertilizers: state.fertilizers.filter(f => f.id !== id) }))
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