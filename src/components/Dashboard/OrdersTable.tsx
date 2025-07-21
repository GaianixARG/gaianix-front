import type { IOrder } from "../../constants/interfaces";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import { COLOR_PER_STATUS } from "../../constants/conversiones";

type Props = {
  data: IOrder[];
};

const columnsOrderTable = [
  { key: "type", label: "Tipo" },
  { key: "field", label: "Lote" },
  {
    key: "status",
    label: "Estado",
    displayItem: ({ status }: IOrder) => (
      <Badge color={COLOR_PER_STATUS[status]} label={status} />
    ),
  },
];

const OrdersTable = ({ data }: Props) => {
  return <Table columns={columnsOrderTable} data={data} />;
};

export default OrdersTable;
