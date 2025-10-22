import React, { useEffect, useMemo, useState } from "react";
import type { ISeed } from "../../constants/interfaces";
import DrawerBody from "../ui/Drawer/DrawerBody";
import DrawerHeader from "../ui/Drawer/DrawerHeader";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { getArrayFromEnum, setDeepValue } from "../../constants/utils";
import { Sprout } from "lucide-react";
import { ESeed } from "../../constants/enums";
import Button from "../ui/Button";
import { useSeedStore } from "../../store/seedStore";

type Props = {
  onSave: (seed: ISeed) => void
};

const initialSeed = { id: "", name: "", type: ESeed.Maiz, provider: "" }

const BodyFormSeed = ({ onSave }: Props) => {
  const [seedDetails, setSeedDetails] = useState<ISeed>(initialSeed)
  const seeds = useSeedStore(state => state.seeds)
  const idxSeedSelected = useSeedStore(state => state.seedSelected)

  useEffect(() => {
    if (idxSeedSelected !== -1) setSeedDetails(seeds[idxSeedSelected])
    else setSeedDetails(initialSeed)
  }, [idxSeedSelected, seeds])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(seedDetails);
  };

  
  const onChangeValue = (property: string, value: any) => {
    setSeedDetails((prev) => setDeepValue(prev, property, value))
  }
  
  const isEditing = seedDetails.id !== ""
  const memoTypeSeed = useMemo(() => getArrayFromEnum(ESeed, false), [])
  return (
    <>
      <DrawerHeader>
        <Sprout className="w-5 h-5 me-3" />
        {isEditing ? "Editar Semilla" : "Nueva Semilla"}
      </DrawerHeader>
      <DrawerBody onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label htmlFor={`seed-name-${seedDetails.id}`} className="block text-sm font-medium text-accent-light">
            Nombre
          </label>
          <Input id={`seed-name-${seedDetails.id}`} name="name" placeholder="Nombre" value={seedDetails.name} onChange={(e) => onChangeValue("name", e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor={`seed-type-${seedDetails.id}`} className="block text-sm font-medium text-accent-light">
            Tipo de semilla
          </label>
          <Select
            id={`seed-type-${seedDetails.id}`}
            name="type"
            options={memoTypeSeed}
            defaultValue={seedDetails.type}
            addOptionEmpty
            onChange={({ target }) => onChangeValue("type", target.value)}
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
