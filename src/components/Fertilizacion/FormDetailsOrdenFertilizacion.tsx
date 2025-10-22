import type { IOrderFertilizacion } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";


const FormDetailsOrdenFertilizacion = ({
  order
}: TFormDetailsOrder) => {
  
  const orderFertilizacion = order as IOrderFertilizacion;

  return <div>{orderFertilizacion.codigo}</div>;
};

export default FormDetailsOrdenFertilizacion;
