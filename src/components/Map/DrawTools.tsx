import type { Circle, DrawEvents, Layer } from "leaflet";
import { EditControl } from "react-leaflet-draw";

import "leaflet-draw/dist/leaflet.draw.css";
import { useLoteDetails } from "../../hooks/useLoteDetails";
import { type GeoJson } from "../../store/usePolygonStore";

const DrawTools = () => {
  const { handleNewLote, handleUpdatePoligonos } = useLoteDetails()
  
  const onEdited = (e: DrawEvents.Edited) => {
    let numEdited = 0;
    const layers: Layer[] = []
    e.layers.eachLayer((l) => {
      layers.push(l)
      console.log(`_onEdited: edited layer`, l);
			numEdited += 1;
    });
    
    handleUpdatePoligonos(layers)
		console.log(`_onEdited: edited ${numEdited} layers`, e);
	};

  const onCreated = (e: DrawEvents.Created) => {
    const type = e.layerType;
    const layer = e.layer;

    let radius = 0;
    switch (type) {
      case "marker": console.log("_onCreated: marker created"); break
      case "circle":
        radius = (layer as Circle<any>).getRadius()
        console.log("_onCreated: circle created");
        break
      case "polygon": console.log("_onCreated: polygon created"); break
      default: console.log("_onCreated: something else created:", type);
    }

    const geo = layer.toGeoJSON() as GeoJson
    
    geo.geometry.radius = radius
    geo.geometry.layer = layer

    handleNewLote(geo.geometry)
	};

	const onDeleted = (e: DrawEvents.Deleted) => {
		let numDeleted = 0;
		e.layers.eachLayer(() => {
			numDeleted += 1;
		});
		console.log(`onDeleted: removed ${numDeleted} layers`, e);
	};

	const onDrawStart = (e: DrawEvents.DrawStart) => {
		console.log("_onDrawStart", e);
	};

	return (
    <EditControl
      onDrawStart={onDrawStart}
      position="topleft"
      onEdited={onEdited}
      onCreated={onCreated}
      onDeleted={onDeleted}
      draw={{
        polyline: false,
        rectangle: false,
        circlemarker: false,
        marker: false
      }}
    />
	);
};

export default DrawTools