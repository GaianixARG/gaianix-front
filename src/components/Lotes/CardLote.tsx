import { MapPinned, Pencil } from "lucide-react"
import { getCentroid, getLinkGoogleMaps, pointIsOrigin } from "../../utils/mapUtils"
import type { ILote, IPoligonoLote } from "../../constants/interfaces"
import { CREATE_LOTE_ID_VALUE, useLoteStore } from "../../store/loteStore"
import { useId } from "react"
import ContentEditingLote from "./ContentEditingLote"
import HeaderEditingLote from "./HeaderEditingLote"
import { ETipoPoligono } from "../../constants/enums"

type PropsCard = {
  lote?: ILote
  onClick: (loteId: string) => void
  isEditing: boolean
  onEdit?: (loteId: string) => void
  onSave: (lote: ILote) => void
  onCancelEdit: () => void
}

const initialPoligono: IPoligonoLote = {
  id: "",
  color: "",
  type: ETipoPoligono.Poligono,
  radius: 0,
  coordenadas: []
}

const initialLote: ILote = {
  id: CREATE_LOTE_ID_VALUE,
  codigo: "",
  campo: { id: "", nombre: "" },
  poligono: initialPoligono
}

const CardLote = ({ lote = initialLote, onClick, isEditing, onEdit, onSave, onCancelEdit }: PropsCard) => {
  const selectedLoteId = useLoteStore(state => state.selectedLoteId);

  const { id, codigo, poligono } = lote

  const vertices = poligono?.coordenadas.map(z => ({ x: z.lat, y: z.lon })) ?? []
  const centerLote = getCentroid(vertices)

  const isSelected = selectedLoteId === id;

  const idInputLote = useId()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEdit) onEdit(id)
  }

  return (
    <li
      onClick={() => onClick(id)}
      className={`
        group/item relative flex items-center justify-between rounded-xl p-4 my-1 cursor-pointer
        hover:-translate-y-0.5 hover:bg-accent/30 bg-accent/10
        transition border-3
        ${isSelected ? "border-primary" : "border-transparent"}
      `}
    >
      {isEditing ? (
        <HeaderEditingLote codigo={codigo} idInput={idInputLote} />
      ) : (
        <p className="text-accent font-bold text-heading grow">{codigo}</p>
      )}

      <div className="flex gap-0.5 items-center">
        {isEditing ? (
          <ContentEditingLote idInputCodigo={idInputLote} lote={lote} onSave={onSave} onCancelEdit={onCancelEdit} />
        ) : (
          <>
             <button
              onClick={handleEdit}
              className="invisible group-hover/item:visible p-1 rounded-lg hover:bg-secondary-light text-accent/60 hover:text-accent/80 transition"
              title="Editar"
            >
              <Pencil size={20} />
            </button>
            {
              !pointIsOrigin(centerLote) &&
              <a
                className="group/edit invisible rounded-lg text-sm transition group-hover/item:visible text-accent/60 hover:bg-secondary-light p-1"
                href={getLinkGoogleMaps(centerLote.x, centerLote.y)}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPinned className="group-hover/edit:text-accent/80" size={22}/>
              </a>
            }
          </>
        )}
      </div>
    </li>
  );
};

export default CardLote
