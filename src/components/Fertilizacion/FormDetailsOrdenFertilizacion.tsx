import { useMemo } from "react";
import type { IOrderFertilizacion } from "../../constants/interfaces";
import type { TFormDetailsOrder } from "../../constants/types";
import { useFertilizerStore } from "../../store/fertilizerStore";
import Select from "../ui/Select";
import Input from "../ui/Input";
import { getArrayFromEnum } from "../../constants/utils";
import { EMetodoFertilizacion } from "../../constants/enums";
import { METODO_FERTILIZACION_NAME } from "../../constants/conversiones";


const FormDetailsOrdenFertilizacion = ({
  order,
  onChangeValue
}: TFormDetailsOrder) => {
  
  const orderFertilizacion = order as IOrderFertilizacion;

  const { fertilizacion } = orderFertilizacion

  const fertilizers = useFertilizerStore(state => state.fertilizers)
  const memoFertilizers = useMemo(() => fertilizers, [fertilizers])

  const memoTypeMetodos = useMemo(() => getArrayFromEnum(EMetodoFertilizacion, true, METODO_FERTILIZACION_NAME), [])

  return (
  <>
    <div className="mb-4">
      <label className="block text-sm font-medium text-accent-light">
        Fertilizante
      </label>
      <Select
        id={`fertilizante_${order.id}`}
        options={memoFertilizers.map((f) => ({
          value: f.id,
          label: f.name,
        }))}
        defaultValue={fertilizacion.fertilizante.id}
        required
        onChange={(e) => onChangeValue("fertilizacion.fertilizante.id", e.target.value)}
        addOptionEmpty
      />
    </div>
    <div className="flex gap-4 mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-accent-light">
          Método
        </label>
        <Select
            id={`metodo_${order.id}`}
            options={memoTypeMetodos}
            addOptionEmpty
            defaultValue={fertilizacion.metodo}
            required
            onChange={({ target }) =>
              onChangeValue("fertilizacion.metodo", target.value)
            }
        />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-medium text-accent-light">
          Dosis Kg x Ha
        </label>
        <Input
          type="number"
          iconRight={<span className="text-accent-light">kg</span>}
          value={fertilizacion.dosisKgHa == 0 ? "" : fertilizacion.dosisKgHa}
          placeholder="Ej: 10"
          required
          onChange={(e) =>
            onChangeValue("fertilizacion.dosisKgHa", e.target.value)
          }
        />
      </div>
    </div>
  </>);
};

export default FormDetailsOrdenFertilizacion;
