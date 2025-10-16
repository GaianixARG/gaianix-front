import { Pencil, Trash } from "lucide-react";
import Table from "../../components/ui/Table";
import type { IFertilizer } from "../../constants/interfaces";
import Button from "../ui/Button";
import { useMemo } from "react";

type Props = {
  fertilizers: IFertilizer[]
  onEdit: (seed: IFertilizer) => void
  onDelete: (id: string) => void
};

const FertilizersTable = ({ fertilizers, onEdit, onDelete }: Props) => {
  const columns = useMemo(() => [
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
              onEdit(item);
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
  ], [onDelete, onEdit]);

  return <Table columns={columns} data={fertilizers} />;
};

export default FertilizersTable;
