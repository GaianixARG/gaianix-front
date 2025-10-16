import { Pencil, Trash } from "lucide-react";
import Table from "../../components/ui/Table";
import type { ISeed } from "../../constants/interfaces";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { COLOR_SEMILLA } from "../../constants/conversiones";

type Props = {
  seeds: ISeed[];
  onEdit: (seed: ISeed) => void;
  onDelete: (id: string) => void;
};

const SeedsTable = ({ seeds, onEdit, onDelete }: Props) => {
  const columns = [
    { key: "name", label: "Nombre" },
    { key: "type", label: "Tipo", displayItem: (item: ISeed) => <Badge label={item.type} color={COLOR_SEMILLA[item.type]} className="py-1 px-3"  /> },
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
