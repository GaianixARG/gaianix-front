import { lazy, useEffect, useState, type JSX, type LazyExoticComponent } from "react";
import type { FOrderDetails, TFormDetailsOrderType } from "../../constants/types";
import { ClipboardCheck, ClipboardList, ClipboardPen } from "lucide-react";
import Button from "../ui/Button";
import BodyFormOrder from "./BodyFormOrder";
import { COLOR_PER_STATUS, ORDER_TYPE_NAME, STATUS_NAME } from "../../constants/conversiones";
import Badge from "../ui/Badge";
import DrawerBody from "../ui/Drawer/DrawerBody";
import DrawerHeader from "../ui/Drawer/DrawerHeader";
import { EOrderType } from "../../constants/enums";
import { useOrderStore } from "../../store/orderStore";
import { initialPerType } from "../../utils/orderUtils";
import { setDeepValue } from "../../constants/utils";
import type { IOrderDetails } from "../../constants/interfaces";

type Props = {
  type: EOrderType
  onCreate: FOrderDetails
  onUpdate: FOrderDetails
};

const FormCreatorOrder: Record<
  EOrderType,
  LazyExoticComponent<
    ({ order, onChangeValue }: TFormDetailsOrderType) => JSX.Element
  >
> = {
  [EOrderType.Siembra]: lazy(() => import("../Siembra/FormDetailsOrdenSiembra")),
  [EOrderType.Fertilizacion]: lazy(
    () => import("../Fertilizacion/FormDetailsOrdenFertilizacion")
  ),
  [EOrderType.Cosecha]: lazy(() => import("../Cosecha/FormDetailsOrdenCosecha")),
};

const FormDetailsOrder = ({
  type,
  onCreate,
  onUpdate,
}: Props) => {
  const orders = useOrderStore(state => state.orders)
  const idxOrderSelected = useOrderStore(state => state.orderSelected)
  const clearSelection = useOrderStore(state => state.selectOrder)

  const [orderDetails, setOrderDetails] = useState<IOrderDetails | null>()

  useEffect(() => {
    const orderSelected = orders[idxOrderSelected]
    if (orderSelected == null) {
      setOrderDetails(initialPerType[type]);
      return;
    }

    if (orderSelected.type !== type) {
      clearSelection("");
      setOrderDetails(initialPerType[type]);
      return;
    }

    setOrderDetails(orderSelected);
  }, [type, idxOrderSelected, orders, clearSelection])


  const handleChangeProperty = (property: string, value: any) => {
    setOrderDetails((prev) => setDeepValue(prev, property, value));
  };

  if (!orderDetails) return

  const { id } = orderDetails;

  const FormTypeComponent = FormCreatorOrder[type];
  const isEditing = id !== "";

  const IconButtonForm = isEditing ? ClipboardPen : ClipboardCheck;
  const textButtonForm = `${isEditing ? "Editar" : "Crear"} Orden de Trabajo`;
  const titleText = `${isEditing ? orderDetails.codigo : ORDER_TYPE_NAME[type]} | ${
    isEditing ? "Editar" : "Creación"
  }`;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isEditing) {
      onUpdate(orderDetails);
    } else {
      onCreate(orderDetails);
    }
  };

  return (
    <>
      <DrawerHeader>
        <ClipboardList className="w-4 h-4 me-3" />
        {titleText}
        <div className="ms-3">
          <Badge
            color={COLOR_PER_STATUS[orderDetails.status]}
            label={STATUS_NAME[orderDetails.status]}
            className="py-1"
          />
        </div>
      </DrawerHeader>
      <DrawerBody onSubmit={handleSubmit}>
        <BodyFormOrder order={orderDetails} onChangeValue={handleChangeProperty} />
        <FormTypeComponent order={orderDetails} onChangeValue={handleChangeProperty} />
        <Button
          tipo="primary-light"
          className="w-full flex items-center justify-center px-2 py-2.5 text-sm font-medium"
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
