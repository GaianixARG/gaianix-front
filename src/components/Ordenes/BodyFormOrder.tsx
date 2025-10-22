import { EPrioridad } from "../../constants/enums";
import type { TFormDetailsOrderType } from "../../constants/types";
import { getArrayFromEnum } from "../../constants/utils";
import { useLoteStore } from "../../store/loteStore";
import Input from "../ui/Input";
import Select from "../ui/Select";

const BodyFormOrder = ({ order, onChangeValue }: TFormDetailsOrderType) => {
  const lotes = useLoteStore(state => state.lotes)

  const handleChangeLote = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue("lote.id", e.target.value)
    onChangeValue("lote.codigo", e.target.selectedOptions[0].text)
  }

  return (
    <>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-accent-light"
        >
          Título
        </label>
        <Input
          type="text"
          id="title"          
          placeholder="Ej: Cosecha de maiz"
          required
          value={order.title}
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
            onChange={handleChangeLote}
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
            onChange={({ target }) => onChangeValue("prioridad", target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default BodyFormOrder;
