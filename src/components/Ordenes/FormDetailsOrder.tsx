import { lazy, type JSX, type LazyExoticComponent } from "react";
import type { IOrder } from "../../constants/interfaces";
import type { TFormDetailsOrder, TOrder } from "../../constants/types";
import { ClipboardCheck, ClipboardList, ClipboardPen } from "lucide-react";
import Button from "../ui/Button";
import BodyFormOrder from "./BodyFormOrder";
import { COLOR_PER_STATUS } from "../../constants/conversiones";
import Badge from "../ui/Badge";

type Props = TFormDetailsOrder & {
  onCreate: (data: IOrder) => void;
  onUpdate: (data: IOrder) => void;
};

const FormCreatorOrder: Record<
  TOrder,
  LazyExoticComponent<
    ({ order, onChangeValue }: TFormDetailsOrder) => JSX.Element
  >
> = {
  Siembra: lazy(() => import("../Siembra/FormDetailsOrdenSiembra")),
  Fertilización: lazy(
    () => import("../Fertilizacion/FormDetailsOrdenFertilizacion")
  ),
  Riego: lazy(() => import("../Riego/FormDetailsOrdenRiego")),
  Cosecha: lazy(() => import("../Cosecha/FormDetailsOrdenCosecha")),
};

const FormDetailsOrder = ({
  order,
  onCreate,
  onUpdate,
  onChangeValue,
}: Props) => {
  const FormTypeComponent = FormCreatorOrder[order.type];
  const { id, type } = order;
  const isEditing = id !== "";

  const IconButtonForm = isEditing ? ClipboardPen : ClipboardCheck;
  const textButtonForm = `${isEditing ? "Editar" : "Crear"} Orden de Trabajo`;
  const titleText = `${isEditing ? order.codigo : type} | ${
    isEditing ? "Editar" : "Creación"
  }`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      onUpdate(order);
    } else {
      onCreate(order);
    }
  };

  return (
    <>
      <h5
        id="drawer-label"
        className="inline-flex items-center text-base pb-4 font-semibold text-white uppercase border-b border-gray-600"
      >
        <ClipboardList className="w-4 h-4 me-3" />
        {titleText}
        <div className="ms-3">
          <Badge
            color={COLOR_PER_STATUS[order.status]}
            label={order.status}
            className="py-1"
          />
        </div>
      </h5>
      <form onSubmit={handleSubmit}>
        <BodyFormOrder order={order} onChangeValue={onChangeValue} />
        <FormTypeComponent order={order} onChangeValue={onChangeValue} />
        <Button
          tipo="primary-light"
          className="w-full flex items-center justify-center px-2 py-2.5 text-sm font-medium"
          onClick={() => {}}
          aria-label={textButtonForm}
          type="submit"
        >
          <IconButtonForm className="w-4 h-4 me-2" />
          {textButtonForm}
        </Button>
      </form>
    </>
  );
};

export default FormDetailsOrder;
