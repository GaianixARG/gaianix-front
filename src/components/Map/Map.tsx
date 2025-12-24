import { FeatureGroup, MapContainer, TileLayer } from 'react-leaflet'

import "leaflet/dist/leaflet.css";
import DrawTools from './DrawTools';
import type { ILote } from '../../constants/interfaces';
import { getCentroid } from '../../utils/mapUtils';
import PolygonLote from './PolygonLote';
import { useMapStore } from '../../store/mapStore';

interface MapProps {
  lotes: ILote[],
  zoom?: number
}

const defaults = {
  zoom: 13,
  initialCenter: { // Loberia..
    x: -38.17930,
    y: -59.21597
  }
}

const Map = ({ zoom = defaults.zoom, lotes }: MapProps) => {
  const setMap = useMapStore(state => state.setMap)

  const vertices = lotes.flatMap(x => x.poligono.coordenadas.map(z => ({ x: z.lat, y: z.lon })))
  const posix = getCentroid(vertices) || defaults.initialCenter

  return (
    <MapContainer
      center={[posix.x, posix.y]}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      /> 
      <FeatureGroup>
        <DrawTools />
        {
          lotes.map((l) =>
            <PolygonLote key={`polygon_lote_${l.id}`} lote={l} />
          )
        }
      </FeatureGroup>
      
    </MapContainer>
  )
}

/*
onEdited	function	hook to leaflet-draw's draw:edited event
onCreated	function	hook to leaflet-draw's draw:created event
onDeleted	function	hook to leaflet-draw's draw:deleted event
onMounted	function	hook to leaflet-draw's draw:mounted event
onEditStart	function	hook to leaflet-draw's draw:editstart event
onEditStop	function	hook to leaflet-draw's draw:editstop event
onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
onDrawStart	function	hook to leaflet-draw's draw:drawstart event
onDrawStop	function	hook to leaflet-draw's draw:drawstop event
onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
onEditMove	function	hook to leaflet-draw's draw:editmove event
onEditResize	function	hook to leaflet-draw's draw:editresize event
onEditVertex	function	hook to leaflet-draw's draw:editvertex event
*/

export default Map