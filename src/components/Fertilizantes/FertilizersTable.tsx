import { Pencil, Trash } from "lucide-react";
import Table from "../../components/ui/Table";
import type { IFertilizer } from "../../constants/interfaces";
import Button from "../ui/Button";
import { useMemo } from "react";
import { useFertilizerStore } from "../../store/fertilizerStore";

type Props = {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
};

const getColumnsFertilizer = ({ onEdit, onDelete }: Props) =>
  [
    { key: "name", label: "Nombre" },
    {
      key: "actions",
      label: "Acciones",
      className: "w-10",
      displayItem: (item: IFertilizer) => (
        <div className="flex gap-2 items-center justify-center">
          <Button
            tipo="accent-light"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(item.id);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            tipo="accent-light"
            className="p-2"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ]

const FertilizersTable = ({ onEdit, onDelete }: Props) => {
  const columns = useMemo(() => getColumnsFertilizer({ onEdit, onDelete }), [onDelete, onEdit]);
  const fertilizers = useFertilizerStore(state => state.fertilizers)
  return <Table columns={columns} data={fertilizers} />;
};

export default FertilizersTable;
