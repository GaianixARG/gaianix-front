import React from "react"
import type { IFertilizer } from "../../constants/interfaces"
import DrawerBody from "../ui/Drawer/DrawerBody"
import DrawerHeader from "../ui/Drawer/DrawerHeader"
import Input from "../ui/Input"
import { BugOff } from "lucide-react"
import Button from "../ui/Button"

type Props = {
  fertilizer: IFertilizer;
  onSave: (fertilizer: IFertilizer) => void;
};

const BodyFormFertilizer = ({ fertilizer, onSave }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(fertilizer);
  };

  const isEditing = fertilizer.id !== "";

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
          <Input name="name" placeholder="Nombre" defaultValue={fertilizer.name} />
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
