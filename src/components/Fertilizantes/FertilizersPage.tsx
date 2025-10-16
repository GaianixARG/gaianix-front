import { SquarePlus } from "lucide-react";
import Button from "../ui/Button";
import Drawer from "../ui/Drawer/Drawer";
import BodyFormFertilizer from "./BodyFormFertilizer";
import useFertilizers from "../../hooks/useFertilizers";
import FertilizersTable from "./FertilizersTable";
import type { IFertilizer } from "../../constants/interfaces";
import { setDeepValue } from "../../constants/utils";
import useButton from "../../hooks/useButton";
import useAlert from "../../hooks/context/useAlert";
import { useLoading } from "../../hooks/context/useLoading";

const drawerDetailsId = "drawer-fertilizer"

const FertilizersPage = () => {
  const { setLoading } = useLoading()
  const { showAlert } = useAlert()
  const { handleToggleDrawer } = useButton({
    dataDrawerTarget: drawerDetailsId
  })

  const {
    fertilizers,
    editingFertilizer,
    setEditingFertilizer,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
  } = useFertilizers(setLoading, showAlert);

  const onEditFertilizer = (fertilizer: IFertilizer) => {
    handleEdit(fertilizer)
    handleToggleDrawer("open")
  }

  const handleChangeProperty = (property: string, value: any) => {
    setEditingFertilizer((prev) => setDeepValue(prev, property, value));
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          dataDrawerTarget={drawerDetailsId}
          onClick={handleCreate}
          className="flex items-center justify-center px-4 py-2.5 text-sm bg-orange-800/40 text-white hover:bg-orange-800/70 rounded-full transition-colors duration-200 hover:shadow-md"
        >
          <SquarePlus className="w-4 h-4 me-2" /> Nuevo Fertilizante
        </Button>
      </div>

      <FertilizersTable fertilizers={fertilizers} onEdit={onEditFertilizer} onDelete={handleDelete} />

      <Drawer id={drawerDetailsId} closeButton>
        <BodyFormFertilizer fertilizer={editingFertilizer} onSave={handleSave} onChangeValue={handleChangeProperty} />
      </Drawer>
    </>
  );
};

export default FertilizersPage;
