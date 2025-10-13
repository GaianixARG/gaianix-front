import { lazy, type JSX, type LazyExoticComponent } from "react";
import type { FOrderDetails, TFormDetailsOrder } from "../../constants/types";
import { ClipboardCheck, ClipboardList, ClipboardPen } from "lucide-react";
import Button from "../ui/Button";
import BodyFormOrder from "./BodyFormOrder";
import { COLOR_PER_STATUS, ORDER_TYPE_NAME, STATUS_NAME } from "../../constants/conversiones";
import Badge from "../ui/Badge";
import DrawerBody from "../ui/Drawer/DrawerBody";
import DrawerHeader from "../ui/Drawer/DrawerHeader";
import {EOrderType} from "../../constants/enums";

type Props = TFormDetailsOrder & {
  onCreate: FOrderDetails;
  onUpdate: FOrderDetails;
};

const FormCreatorOrder: Record<
  EOrderType,
  LazyExoticComponent<
    ({ order, onChangeValue }: TFormDetailsOrder) => JSX.Element
  >
> = {
  [EOrderType.Siembra]: lazy(() => import("../Siembra/FormDetailsOrdenSiembra")),
  [EOrderType.Fertilizacion]: lazy(
    () => import("../Fertilizacion/FormDetailsOrdenFertilizacion")
  ),
  [EOrderType.Cosecha]: lazy(() => import("../Cosecha/FormDetailsOrdenCosecha")),
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
  const titleText = `${isEditing ? order.codigo : ORDER_TYPE_NAME[type]} | ${
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
      <DrawerHeader>
        <ClipboardList className="w-4 h-4 me-3" />
        {titleText}
        <div className="ms-3">
          <Badge
            color={COLOR_PER_STATUS[order.status]}
            label={STATUS_NAME[order.status]}
            className="py-1"
          />
        </div>
      </DrawerHeader>
      <DrawerBody onSubmit={handleSubmit}>
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
      </DrawerBody>
    </>
  );
};

export default FormDetailsOrder;
