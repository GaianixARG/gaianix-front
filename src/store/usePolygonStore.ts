import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ETipoPoligono } from '../constants/enums'
import type { Layer } from 'leaflet'


type GeometryCircle = {
  type: ETipoPoligono.Circle,
  radius: number,
  layer: Layer
  coordinates: [number, number]
}

type GeometryPolygon = {
  type: ETipoPoligono.Poligono,
  radius: 0,
  layer: Layer,
  coordinates: [Array<[number, number]>]
}

export type GeometryDraw = GeometryCircle | GeometryPolygon
export type GeoJson = {
  geometry: GeometryDraw
}

export type TPolygonStore = {
  polygon: GeometryDraw | null
  editedLayers: Layer[]
  setPolygon: (geometry: GeometryDraw | null) => void
  setEditedLayers: (layers: Layer[]) => void
}

export const usePolygonStore = create<TPolygonStore>()(
  immer(
    (set) => (
      {
        polygon: null,
        editedLayers: [],
        setPolygon: (geometry: GeometryDraw | null) => set({ polygon: geometry }),
        setEditedLayers: (layers: Layer[]) => set({ editedLayers: layers })
      }
    )
  )
)