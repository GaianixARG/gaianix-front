import { Pencil, Trash } from "lucide-react";
import Table from "../../components/ui/Table";
import type { ISeed } from "../../constants/interfaces";
import Button from "../ui/Button";

type Props = {
  seeds: ISeed[];
  onEdit: (seed: ISeed) => void;
  onDelete: (id: string) => void;
};

const SeedsTable = ({ seeds, onEdit, onDelete }: Props) => {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "type", label: "Tipo" },
    {
      key: "actions",
      label: "Acciones",
      displayItem: (item: ISeed) => (
        <div className="flex gap-2 items-center">
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
  ];

  return <Table columns={columns} data={seeds} />;
};

export default SeedsTable;
