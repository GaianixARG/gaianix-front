import { useEffect, useState } from "react"
import type { ILote, IPoligonoLote } from "../../constants/interfaces"
import { useLoteStore } from "../../store/loteStore"
import { ETipoPoligono } from "../../constants/enums"

const initialPoligono: IPoligonoLote = {
  id: "",
  color: "",
  coordenadas: [],
  type: ETipoPoligono.Poligono,
  radius: 0
}

const initialLote: ILote = {
  id: "",
  codigo: "Ejemplo",
  campo: { 
    id: "",
    nombre: ""
  },
  poligono: initialPoligono
}

const getLoteDetails = (loteId: string, lotes: ILote[]) => {
  return lotes.find(x => x.id === loteId)
}

const BodyFormLote = () => {
  const lotes = useLoteStore(state => state.lotes)
  const loteSelectedId = useLoteStore(state => state.selectedLoteId)

  const [loteDetails, setLoteDetails] = useState(() => initialLote)

  useEffect(() => {
    const loteSelected = getLoteDetails(loteSelectedId, lotes)
    if (loteSelected) setLoteDetails(loteSelected)
  }, [loteSelectedId, lotes])

  return (
    <div>
      <h1 className="text-white">{loteDetails.codigo}</h1>
    </div>
  )
}

export default BodyFormLote
