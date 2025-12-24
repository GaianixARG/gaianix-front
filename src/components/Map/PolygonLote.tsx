import { Circle, Polygon } from "react-leaflet";
import type { ILote, IPoligonoLote } from "../../constants/interfaces";
import { useLoteStore } from "../../store/loteStore";
import { ETipoPoligono } from "../../constants/enums";
import type { ComponentType } from "react";

type PropsPoligono  = {
  lote: ILote
}

type PropsDrawPoligono = {
  idLote: string
  poligono: IPoligonoLote,
  isSelected: boolean,
  setSelectedLote: (id: string) => void
}

const LoteCircular = ({ idLote, poligono, isSelected, setSelectedLote }: PropsDrawPoligono) => {
  return <Circle
    center={[poligono.coordenadas[0].lat, poligono.coordenadas[0].lon]}
    radius={poligono.radius}
    pathOptions={{
      color: poligono.color,
      weight: isSelected ? 3 : 1,
      dashArray: "4 4",
      fillColor: poligono.color,
      fillOpacity: isSelected ? 0.35 : 0.15,
    }}
    eventHandlers={{
      click: () => setSelectedLote(idLote),
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, fillOpacity: 0.35 });
      },
      mouseout: (e) => {
        if (!isSelected) {
          e.target.setStyle({ weight: 1, fillOpacity: 0.15 });
        }
      }
    }}
  />
}

const LotePoligonal = ({ idLote, poligono, isSelected, setSelectedLote }: PropsDrawPoligono) => {
  return <Polygon
    positions={poligono.coordenadas.map(c => ([c.lat, c.lon]))}
    pathOptions={{
      color: poligono.color,
      weight: isSelected ? 3 : 1,
      dashArray: "4 4",
      fillColor: poligono.color,
      fillOpacity: isSelected ? 0.35 : 0.15,
    }}
    eventHandlers={{
      click: () => setSelectedLote(idLote),
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, fillOpacity: 0.35 });
      },
      mouseout: (e) => {
        if (!isSelected) {
          e.target.setStyle({ weight: 1, fillOpacity: 0.15 });
        }
      }
    }}
  />
}

const PolygonLote = ({ lote }: PropsPoligono) => {
  const selectedLoteId = useLoteStore(state => state.selectedLoteId)
  const setSelectedLote = useLoteStore(state => state.setSelectedLote)

  const { id, poligono } = lote
  const isSelected = selectedLoteId === id

  let ComponentDraw: ComponentType<PropsDrawPoligono> | null = null
  if (poligono.type === ETipoPoligono.Circle) ComponentDraw = LoteCircular
  if (poligono.type === ETipoPoligono.Poligono) ComponentDraw = LotePoligonal

  return (
    ComponentDraw &&
    <ComponentDraw
      idLote={id}
      poligono={poligono}
      isSelected={isSelected}
      setSelectedLote={setSelectedLote}
    />
  )
  
  
  
}

export default PolygonLote