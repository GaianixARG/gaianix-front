import { useMemo } from "react"
import type { IOrderSiembra } from "../../constants/interfaces"
import DatePicker from "../ui/DatePicker/DatePicker"
import Input from "../ui/Input"
import Select from "../ui/Select"
import { getArrayFromEnum } from "../../constants/utils"
import type { TFormDetailsOrder } from "../../constants/types"
import { EDistanciaSiembra } from "../../constants/enums"
import { useSeedStore } from "../../store/seedStore"
import { useFertilizerStore } from "../../store/fertilizerStore"

const FormDetailsOrdenSiembra = ({
  order,
  onChangeValue,
}: TFormDetailsOrder) => {
  const siembraDetails = order as IOrderSiembra

  const seeds = useSeedStore(state => state.seeds)
  const memoSeeds = useMemo(() => seeds, [seeds])

  const fertilizers = useFertilizerStore(state => state.fertilizers)
  const memoFertilizers = useMemo(() => fertilizers, [fertilizers])

  const handleChangeValueFertilizer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChangeValue("siembra.fertilizante.id", e.target.value)
    // ESTO ES PARA QUE TOME BIEN EN EL BACKEND
    if (siembraDetails.siembra.fertilizante == null) onChangeValue("siembra.fertilizante.name", "")
  }

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
          <Input
            type="number"
            value={siembraDetails.siembra.cantidadHectareas}
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
            onChange={({ target }) => onChangeValue("siembra.datosSemilla.semilla.id", target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Cantidad por ha
          </label>
          <Input
            iconRight={<span className="text-accent-light">u/ha</span>}
            value={siembraDetails.siembra.datosSemilla.cantidadSemillasHa}
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
            onChange={handleChangeValueFertilizer}
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
            onChange={({ target }) =>
              onChangeValue("siembra.distanciaSiembra", target.value)
            }
          />
        </div>
      </div>
    </>
  )
}

export default FormDetailsOrdenSiembra
