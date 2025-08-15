import type { IOrder, IOrderCosecha } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";

const FormDetailsOrdenCosecha = ({
  order,
  onChangeValue,
}: TFormDetailsOrder) => {
  const orderCosecha = order as IOrderCosecha;

  return (
    <h1 className="text-2xl font-bold mb-4">Detalles de la Orden de Cosecha</h1>
  );
};

export default FormDetailsOrdenCosecha;
