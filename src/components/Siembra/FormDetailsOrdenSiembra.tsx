import { useMemo } from "react";
import type { IOrderSiembra } from "../../constants/interfaces";
import DatePicker from "../ui/DatePicker/DatePicker";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { getArrayFromEnum } from "../../constants/utils";
import type { TFormDetailsOrder } from "../../constants/types";
import useSeeds from "../../hooks/useSeeds";
import { useLoading } from "../../context/LoadingContext";
import { useAlert } from "../../context/AlertContext";
import { EDistanciaSiembra } from "../../constants/enums";
import useFertilizers from "../../hooks/useFertilizers";

const FormDetailsOrdenSiembra = ({
  order,
  onChangeValue,
}: TFormDetailsOrder) => {
  const siembraDetails = order as IOrderSiembra;
  const { setLoading } = useLoading()
  const { showAlert } = useAlert()

  const { seeds } = useSeeds(setLoading, showAlert);
  const memoSeeds = useMemo(() => seeds, [seeds]);

  const { fertilizers } = useFertilizers(setLoading, showAlert)
  const memoFertilizers = useMemo(() => fertilizers, [fertilizers]);

  return (
    <>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <DatePicker
            id={`fecha-max-siembra_${order.id}`}
            defaultValue={siembraDetails.siembra.fechaMaxSiembra}
            placeholder="Selecciona una fecha"
            label="Fecha Máxima"
            required
            onChange={(date) => {
              onChangeValue("siembra.fechaMaxSiembra", date)
            }}
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Cantidad de Hectáreas
          </label>
          <input
            type="number"
            defaultValue={siembraDetails.siembra.cantidadHectareas}
            className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
            placeholder="Ej: 10"
            required
            onChange={(e) =>
              onChangeValue("siembra.cantidadHectareas", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Tipo de Semilla
          </label>
          <Select
            id={`tipo-semilla_${order.id}`}
            options={memoSeeds.map((seed) => ({
              value: seed.id,
              label: seed.name,
            }))}
            addOptionEmpty
            defaultValue={siembraDetails.siembra.datosSemilla.semilla.id}
            required
            onChange={(value) => onChangeValue("siembra.datosSemilla.semilla.id", value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Cantidad por ha
          </label>
          <Input
            iconRight={<span className="text-accent-light">u/ha</span>}
            defaultValue={siembraDetails.siembra.datosSemilla.cantidadSemillasHa}
            placeholder="Ej: 100000"
            required
            onChange={(e) =>
              onChangeValue("siembra.datosSemilla.cantidadSemillasHa", e.target.value)
            }
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Fertilizante
          </label>
            <Select
            id={`fertilizante_${order.id}`}
            options={memoFertilizers.map((f) => ({
              value: f.id,
              label: f.name,
            }))}
            defaultValue={siembraDetails.siembra.fertilizante?.id}
            required
            onChange={(value) =>
              onChangeValue("siembra.fertilizante.id", value)
            }
            addOptionEmpty
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Distancia de Siembra
          </label>
          <Select
            id={`distancia-siembra_${order.id}`}
            options={getArrayFromEnum(EDistanciaSiembra)}
            defaultValue={siembraDetails.siembra.distanciaSiembra}
            required
            onChange={(value) =>
              onChangeValue("siembra.distanciaSiembra", value)
            }
          />
        </div>
      </div>
    </>
  );
};

export default FormDetailsOrdenSiembra;
