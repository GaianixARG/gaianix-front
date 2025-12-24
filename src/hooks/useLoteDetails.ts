import type { Layer } from "leaflet"
import { ETipoPoligono } from "../constants/enums"
import type { Coordenada, ILote } from "../constants/interfaces"
import { useAlertStore } from "../store/alertStore"
import { CREATE_LOTE_ID_VALUE, INITIAL_SELECTED_LOTE_ID, useLoteStore } from "../store/loteStore"
import { useMapStore } from "../store/mapStore"
import { usePolygonStore, type GeometryDraw } from "../store/usePolygonStore"

export const useLoteDetails = () => {
  const removeLayer = useMapStore(state => state.removeLayer)

  const currentPolygon = usePolygonStore(state => state.polygon)
  const setPolygon = usePolygonStore(state => state.setPolygon)

  const showAlert = useAlertStore(state => state.showAlert)

  const setEditingLoteId = useLoteStore(state => state.setEditingLoteId)
  const createLote = useLoteStore(state => state.createLote)
  const updateLote = useLoteStore(state => state.updateLote)
  const removeLote = useLoteStore(state => state.removeLote)

  const handleCreateNewLote = async (lote: ILote) => {
    const newLote = await createLote(lote)
    const exito = newLote != null
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? `Lote ${newLote.codigo} creado correctamente!` : "Error al crear el lote",
    })

    if (!exito && currentPolygon) removeLayer(currentPolygon.layer) 
  }

  const handleUpdateLote = async (lote: ILote) => {
    const exito = await updateLote(lote)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? "Lote actualizado correctamente!" : "Error al actualizar el lote",
    })
  }

  const handleSaveLote = async (lote: ILote) => {
    if (lote.id !== CREATE_LOTE_ID_VALUE) await handleUpdateLote(lote)
    else {
      if (currentPolygon != null) {
        let coords: Coordenada[] = []
        switch (currentPolygon.type) {
          case ETipoPoligono.Circle:
            coords = [{ id: "", lon: currentPolygon.coordinates[0], lat: currentPolygon.coordinates[1] }]
            break
          case ETipoPoligono.Poligono:
            coords = currentPolygon.coordinates[0].map(po => ({ id: "", lon: po[0], lat: po[1] }))
            break
        }
        lote.poligono.type = currentPolygon.type
        lote.poligono.radius = currentPolygon.radius
        lote.poligono.coordenadas = coords
      }

      await handleCreateNewLote(lote)
    }
    
    setEditingLoteId(INITIAL_SELECTED_LOTE_ID)
  }

  const handleDeleteLote = async (id: string) => {
    const exito = await removeLote(id)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? "Lote eliminado correctamente!" : "Error al eliminar el lote",
    })
  }

  const handleUpdatePoligonos = (layers: Layer[]) => {
    console.log(layers)
  }

  const handleNewLote = (geometry: GeometryDraw) => {
    setPolygon(geometry)
    setEditingLoteId(CREATE_LOTE_ID_VALUE)
  }

  const handleCancelEdit = () => {
    if (currentPolygon) removeLayer(currentPolygon.layer)
    
    setPolygon(null)
    setEditingLoteId(INITIAL_SELECTED_LOTE_ID)
  }

  return {
    handleNewLote,
    handleCancelEdit,
    handleSaveLote,
    handleDeleteLote,
    handleUpdatePoligonos
  }
}