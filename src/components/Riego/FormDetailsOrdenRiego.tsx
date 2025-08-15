import type { IOrder, IOrderRiego } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";

const FormDetailsOrdenRiego = ({ order, onChangeValue }: TFormDetailsOrder) => {
  const orderRiego = order as IOrderRiego;
  return <div>FormDetailsOrdenRiego</div>;
};

export default FormDetailsOrdenRiego;
