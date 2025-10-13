import type { IOrderFertilizacion } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";

const FormDetailsOrdenFertilizacion = ({
  order,
  onChangeValue,
}: TFormDetailsOrder) => {
  
  const orderFertilizacion = order as IOrderFertilizacion;
  onChangeValue("a", orderFertilizacion.codigo)
  return <div>{orderFertilizacion.codigo}</div>;
};

export default FormDetailsOrdenFertilizacion;
