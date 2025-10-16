import type { IOrderCosecha } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";

const FormDetailsOrdenCosecha = ({
  order,
}: TFormDetailsOrder) => {
  const orderCosecha = order as IOrderCosecha;
  return (
    <h1 className="text-2xl font-bold mb-4">{orderCosecha.codigo}</h1>
  );
};

export default FormDetailsOrdenCosecha;
