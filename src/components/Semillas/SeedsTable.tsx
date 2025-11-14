import { Pencil, Trash } from "lucide-react"
import Table from "../../components/ui/Table"
import type { ISeed } from "../../constants/interfaces"
import Button from "../ui/Button"
import Badge from "../ui/Badge"
import { COLOR_SEMILLA } from "../../constants/conversiones"
import { useSeedStore } from "../../store/seedStore"
import { useMemo } from "react"

type Props = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const getColumnsSeed = ({ onEdit, onDelete }: Props) =>
  [
    { key: "name", label: "Nombre", sortable: true },
    {
      key: "type", label: "Tipo", sortable: true,
      displayItem: (item: ISeed) => <Badge label={item.type} color={COLOR_SEMILLA[item.type]} className="py-1 px-3" />
    },
    {
      key: "actions",
      label: "Acciones",
      className: "w-10",
      displayItem: (item: ISeed) => (
        <div className="flex gap-2 items-center">
          <Button
            tipo="accent-light"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation()
              onEdit(item.id)
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            tipo="accent-light"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(item.id)
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

const SeedsTable = ({ onEdit, onDelete }: Props) => {
  const columns = useMemo(() => getColumnsSeed({ onEdit, onDelete }), [onEdit, onDelete])
  const seeds = useSeedStore(state => state.seeds)
  return <Table columns={columns} data={seeds} />
}

export default SeedsTable
