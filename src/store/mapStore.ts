import type { Layer, Map as MapType } from 'leaflet'
import { create } from 'zustand'
import { getCentroid, type Point } from '../utils/mapUtils'
import type { ILote } from '../constants/interfaces'

export type TMapStore = {
  Map: MapType | null
  setMap: (value: MapType | null) => void
  flyTo: (point: Point) => void
  flyToLote: (lote: ILote) => void
  removeLayer: (layer: Layer) => void
}

export const useMapStore = create<TMapStore>()(
  (set, get) => (
    {
      Map: null,
      setMap: (value: MapType | null) => set({ Map: value }),
      flyTo: (point: Point) => {
        const { Map } = get()

        Map?.flyTo([point.x, point.y])
      },
      flyToLote: (lote: ILote) => {
        const { flyTo } = get()
        const vertices = lote.poligono.coordenadas.map(z => ({ x: z.lat, y: z.lon }))
        const center = getCentroid(vertices)
        if (center) flyTo(center)
      },
      removeLayer: (layer: Layer) => {
        const { Map } = get()

        Map?.removeLayer(layer)
      }
    }
  )
)