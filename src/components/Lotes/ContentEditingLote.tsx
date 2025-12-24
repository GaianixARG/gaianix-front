import { Check, X } from "lucide-react"
import Button from "../ui/Button"
import type { ILote } from "../../constants/interfaces"

type PropsCardContentEditing = {
  lote: ILote
  idInputCodigo: string
  onSave: (lote: ILote) => void
  onCancelEdit: () => void
}

const ContentEditingLote = ({ lote, idInputCodigo, onCancelEdit, onSave }: PropsCardContentEditing) => {  
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()

    const codigo = (document.getElementById(idInputCodigo) as HTMLInputElement)?.value ?? ""

    onSave({ ...lote, codigo })
  }

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation()
    onCancelEdit()
  }

  return (
    <>
      <Button
        onClick={handleSave}
        className="p-1 rounded-lg bg-transparent text-accent/60 hover:bg-success/70 hover:text-white transition"
        title="Guardar"
      >
        <Check size={20} />
      </Button>
      <Button
        onClick={handleCancel}
        className="p-1 rounded-lg bg-transparent text-accent/60 hover:bg-error/70 hover:text-white transition"
        title="Cancelar"
      >
        <X size={20} />
      </Button>
    </>
  )
}

export default ContentEditingLote