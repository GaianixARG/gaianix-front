import React from "react";
import type { IOrder, IOrderSiembra } from "../../constants/interfaces";
import { DISTANCIA_SIEMBRA, PRIORIDADES } from "../../constants/enums";
import DatePicker from "../ui/DatePicker/DatePicker";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { getArrayFromEnum } from "../../constants/utils";

const FormDetailsOrdenSiembra = (order: IOrder) => {
  const siembraDetails = order as IOrderSiembra;

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
          />
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Prioridad
          </label>
          <Select
            id={`prioridad_${order.id}`}
            options={getArrayFromEnum(PRIORIDADES)}
            defaultValue={siembraDetails.siembra.prioridad}
            required
          />
        </div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Tipo de Semilla
          </label>
          <input
            type="text"
            defaultValue={siembraDetails.siembra.tipoSemilla}
            className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
            placeholder="Ej: Maíz"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Cantidad por ha
          </label>
          <Input
            iconRight={<span className="text-accent-light">u/ha</span>}
            defaultValue={siembraDetails.siembra.cantidadSemillasHa}
            placeholder="Ej: 100000"
            required
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-accent-light">
          Cantidad de Hectáreas
        </label>
        <input
          type="number"
          defaultValue={siembraDetails.siembra.cantidadHectareas}
          className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
          placeholder="Ej: 10"
          required
        />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Fertilizante
          </label>
          <input
            type="text"
            defaultValue={siembraDetails.siembra.fertilizante}
            className="text-sm rounded-lg block w-full p-2.5 border bg-gray-700 border-gray-600 placeholder-accent-light text-white focus-visible:ring-1 focus-visible:ring-primary-light focus-visible:outline-none"
            placeholder="Ej: Urea"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-accent-light">
            Distancia de Siembra
          </label>
          <Select
            id={`distancia-siembra_${order.id}`}
            options={getArrayFromEnum(DISTANCIA_SIEMBRA)}
            defaultValue={siembraDetails.siembra.distanciaSiembra}
            required
          />
        </div>
      </div>
    </>
  );
};

export default FormDetailsOrdenSiembra;
