import React, { useMemo } from "react";
import type { ISeed } from "../../constants/interfaces";
import DrawerBody from "../ui/Drawer/DrawerBody";
import DrawerHeader from "../ui/Drawer/DrawerHeader";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { getArrayFromEnum } from "../../constants/utils";
import { Sprout } from "lucide-react";
import { ESeed } from "../../constants/enums";
import Button from "../ui/Button";

type Props = {
  seed: ISeed;
  onSave: (seed: ISeed) => void;
};

const BodyFormSeed = ({ seed, onSave }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(seed);
  };

  const isEditing = seed.id !== "";

  const memoTypeSeed = useMemo(() => getArrayFromEnum(ESeed, false), [])
  return (
    <>
      <DrawerHeader>
        <Sprout className="w-5 h-5 me-3" />
        {isEditing ? "Editar Semilla" : "Nueva Semilla"}
      </DrawerHeader>
      <DrawerBody onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor={`seed-name-${seed.id}`} className="block text-sm font-medium text-accent-light">
            Nombre
          </label>
          <Input id={`seed-name-${seed.id}`} name="name" placeholder="Nombre" defaultValue={seed.name} />
        </div>
        <div className="mb-4">
          <label htmlFor={`seed-type-${seed.id}`} className="block text-sm font-medium text-accent-light">
            Tipo de semilla
          </label>
          <Select
            id={`seed-type-${seed.id}`}
            name="type"
            options={memoTypeSeed}
            defaultValue={seed.type}
            addOptionEmpty
            //onChange={handleChange}
          />
        </div>
        <Button
          tipo="primary-light"
          type="submit"
          className="w-full flex items-center justify-center px-2 py-2.5 text-sm font-medium"
        >
          Guardar
        </Button>
      </DrawerBody>
    </>
  );
};

export default BodyFormSeed;
