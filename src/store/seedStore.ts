import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ISeed } from '../constants/interfaces'
import { withLoading } from './middlewares/withLoading'
import { seedService } from '../services/seedService'

export type TSeedState = {
  seeds: ISeed[]
  seedSelected: number
  fetchSeeds: () => Promise<boolean>
  selectSeed: (seedId: string) => void
  createNewSeed: (seed: ISeed) => Promise<ISeed | null>
  updateSeed: (seed: ISeed) => Promise<boolean>
  deleteSeed: (seedId: string) => Promise<boolean>
}

export const useSeedStore = create<TSeedState>()(
  immer(
    withLoading(
      (set, get) => (
        {
          seeds: [],
          seedSelected: -1,

          fetchSeeds: async () => {
            try {
              const response = await seedService.getAll()
              set({ seeds: response.data })

              return true
            } catch {
              return false
            }
          },

          selectSeed: (seedId: string) => {
            set(state => ({ seedSelected: state.seeds.findIndex(s => s.id == seedId) }))
          },

          createNewSeed: async (seed: ISeed) => {
            try {
              const newSeed = (await seedService.create(seed)).data
              set(state => ({ seeds: [...state.seeds, newSeed] }))
              return newSeed
            } catch {
              return null
            }
          },

          updateSeed: async (seed: ISeed) => {
            try {
              await seedService.update(seed.id, seed)
              
              const { seeds } = get()
              const newSeeds = structuredClone(seeds)
              const idxSeed = newSeeds.findIndex(s => s.id === seed.id)
              if (idxSeed === -1) return false
            
              newSeeds[idxSeed] = seed

              set({ seeds: newSeeds })
              return true
            } catch {
              return false
            }
          },

          deleteSeed: async (id: string) => {
            try {
              seedService.remove(id)
              set(state => ({ seeds: state.seeds.filter(s => s.id !== id) }))
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