import { SquarePlus } from "lucide-react";
import SeedsTable from "./SeedsTable";
import BodyFormSeed from "./BodyFormSeed";
import useSeeds from "../../hooks/useSeeds";
import Button from "../ui/Button";
import Drawer from "../ui/Drawer/Drawer";
import type { ISeed } from "../../constants/interfaces";
import { setDeepValue } from "../../constants/utils";
import { useLoading } from "../../hooks/context/useLoading";
import useAlert from "../../hooks/context/useAlert";
import useButton from "../../hooks/useButton";

const drawerDetailsId = "drawer-seed"

const SeedsPage = () => {
  const { setLoading } = useLoading()
  const { showAlert } = useAlert()
  const { handleToggleDrawer } = useButton({
    dataDrawerTarget: drawerDetailsId
  })
  const {
    seeds,
    editingSeed,
    setEditingSeed,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
  } = useSeeds(setLoading, showAlert);

  const onEditSeed = (seed: ISeed) => {
    handleEdit(seed)
    handleToggleDrawer("open")
  }

  const handleChangeProperty = (property: string, value: any) => {
    setEditingSeed((prev) => setDeepValue(prev, property, value));
  };

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          dataDrawerTarget={drawerDetailsId}
          onClick={handleCreate}
          className="flex items-center justify-center px-4 py-2.5 text-sm bg-orange-800/40 text-white hover:bg-orange-800/70 rounded-full transition-colors duration-200 hover:shadow-md"
        >
          <SquarePlus className="w-4 h-4 me-2" /> Nueva Semilla
        </Button>
      </div>

      <SeedsTable seeds={seeds} onEdit={onEditSeed} onDelete={handleDelete} />

      <Drawer id={drawerDetailsId} closeButton>
        <BodyFormSeed seed={editingSeed} onSave={handleSave} onChangeValue={handleChangeProperty}/>
      </Drawer>
    </>
  );
};

export default SeedsPage;
