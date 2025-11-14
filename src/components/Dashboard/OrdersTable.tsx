import type { IOrderTableDashboard } from "../../constants/interfaces";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import { COLOR_PER_STATUS, STATUS_NAME } from "../../constants/conversiones";

type Props = {
  data: IOrderTableDashboard[];
};

const columnsOrderTable = [
  { key: "type", label: "Tipo", sortable: true },
  { key: "lote", label: "Lote" },
  { key: "dateOfCreation", label: "Fecha Alta", sortable: true },
  {
    key: "status",
    label: "Estado",
    displayItem: ({ status }: IOrderTableDashboard) => (
      <Badge color={COLOR_PER_STATUS[status]} label={STATUS_NAME[status]} className="py-1" />
    ),
  },
];

const OrdersTable = ({ data }: Props) => {
  return <Table columns={columnsOrderTable} data={data} />;
};

export default OrdersTable;
