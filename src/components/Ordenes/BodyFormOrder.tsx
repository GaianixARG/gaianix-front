import { EPrioridad } from "../../constants/enums";
import type { TFormDetailsOrder } from "../../constants/types";
import { getArrayFromEnum } from "../../constants/utils";
import useInfoCampos from "../../hooks/useInfoCampos";
import Select from "../ui/Select";

const BodyFormOrder = ({ order, onChangeValue }: TFormDetailsOrder) => {
  const { lotes } = useInfoCampos();

  return (
    <>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-accent-light"
        >
          Título
        </label>
        <input
          type="text"
          id="title"
          className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
          placeholder="Ej: Cosecha de maiz"
          required
          defaultValue={order.title}
          onChange={(e) => onChangeValue("title", e.target.value)}
        />
      </div>
      <div className="flex gap-4 mb-3">
        <div className="flex-1">
          <label
            htmlFor={`lote_${order.id}`}
            className="block text-sm font-medium text-accent-light">
            Lote
          </label>
          <Select
            id={`lote_${order.id}`}
            options={lotes.map(x => ({ value: x.id, label: x.codigo })) ?? []}
            addOptionEmpty
            defaultValue={order.lote.id}
            required
            onChange={(value) => onChangeValue("lote.id", value)}
          />
        </div>

        <div className="flex-1">
          <label htmlFor={`prioridad_${order.id}`} className="block text-sm font-medium text-accent-light">
            Prioridad
          </label>
          <Select
            id={`prioridad_${order.id}`}
            options={getArrayFromEnum(EPrioridad)}
            defaultValue={order.prioridad}
            required
            onChange={(value) => onChangeValue("prioridad", value)}
          />
        </div>
      </div>
    </>
  );
};

export default BodyFormOrder;
