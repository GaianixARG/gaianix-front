import type { IOrder, IOrderFertilizacion } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";

const FormDetailsOrdenFertilizacion = ({
  order,
  onChangeValue,
}: TFormDetailsOrder) => {
  const orderFertilizacion = order as IOrderFertilizacion;
  return <div>FormDetailsOrdenFertilizacion</div>;
};

export default FormDetailsOrdenFertilizacion;
