import React, { useEffect, useState } from "react"
import type { IFertilizer } from "../../constants/interfaces"
import DrawerBody from "../ui/Drawer/DrawerBody"
import DrawerHeader from "../ui/Drawer/DrawerHeader"
import Input from "../ui/Input"
import { BugOff } from "lucide-react"
import Button from "../ui/Button"
import { setDeepValue } from "../../constants/utils"
import { useFertilizerStore } from "../../store/fertilizerStore"

type Props = {
  onSave: (fertilizer: IFertilizer) => void
};

const initialFertilizer = { id: "", name: "" }

const BodyFormFertilizer = ({ onSave }: Props) => {
  const [fertilizerDetails, setFertilizerDetails] = useState<IFertilizer>(initialFertilizer)
  const fertilizers = useFertilizerStore(state => state.fertilizers)
  const idxFertSelected = useFertilizerStore(state => state.fertilizerSelected)

  useEffect(() => {
    if (idxFertSelected !== -1) setFertilizerDetails(fertilizers[idxFertSelected])
    else setFertilizerDetails(initialFertilizer)
  }, [idxFertSelected, fertilizers])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(fertilizerDetails);
  };

  const isEditing = fertilizerDetails.id !== ''

  const onChangeValue = (property: string, value: any) => {
    setFertilizerDetails((prev) => setDeepValue(prev, property, value))
  }

  return (
    <>
      <DrawerHeader>
        <BugOff className="w-5 h-5 me-3" />
        {isEditing ? "Editar Fertilizante" : "Nuevo Fertilizante"}
      </DrawerHeader>
      <DrawerBody onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-accent-light">
              Nombre
          </label>
          <Input name="name" placeholder="Nombre" value={fertilizerDetails.name} onChange={(e) => onChangeValue("name", e.target.value)} />
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

export default BodyFormFertilizer;
