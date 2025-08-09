import { lazy, type JSX, type LazyExoticComponent } from "react";
import type { IOrder } from "../../constants/interfaces";
import type { TOrder } from "../../constants/types";
import { ClipboardCheck, ClipboardList, ClipboardPen } from "lucide-react";
import Button from "../ui/Button";
import BodyFormOrder from "./BodyFormOrder";
import { COLOR_PER_STATUS } from "../../constants/conversiones";
import Badge from "../ui/Badge";

type Props = {
  order: IOrder;
};

const FormCreatorOrder: Record<
  TOrder,
  LazyExoticComponent<(order: IOrder) => JSX.Element>
> = {
  Siembra: lazy(() => import("../Siembra/FormDetailsOrdenSiembra")),
  Fertilización: lazy(
    () => import("../Fertilizacion/FormDetailsOrdenFertilizacion")
  ),
  Riego: lazy(() => import("../Riego/FormDetailsOrdenRiego")),
  Cosecha: lazy(() => import("../Cosecha/FormDetailsOrdenCosecha")),
};

const FormDetailsOrder = ({ order }: Props) => {
  const FormTypeComponent = FormCreatorOrder[order.type];
  const { id, type } = order;
  const isEditing = id !== "";

  const IconButtonForm = isEditing ? ClipboardPen : ClipboardCheck;
  const textButtonForm = `${isEditing ? "Editar" : "Crear"} Orden de Trabajo`;
  const titleText = `${isEditing ? order.codigo : type} | ${
    isEditing ? "Editar" : "Creación"
  }`;

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
      <form>
        <BodyFormOrder order={order} />
        <FormTypeComponent {...order} />
        <Button
          tipo="primary-light"
          className="w-full flex items-center justify-center px-2 py-2.5 text-sm font-medium"
        >
          <IconButtonForm className="w-4 h-4 me-2" />
          {textButtonForm}
        </Button>
      </form>
    </>
  );
};

export default FormDetailsOrder;
