import { SquarePlus } from "lucide-react";
import SeedsTable from "./SeedsTable";
import BodyFormSeed from "./BodyFormSeed";
import useSeeds from "../../hooks/useSeeds";
import Button from "../ui/Button";
import Drawer from "../ui/Drawer/Drawer";
import { useLoading } from "../../context/LoadingContext";
import { useAlert } from "../../context/AlertContext";
import useButton from "../../hooks/useButton";
import type { ISeed } from "../../constants/interfaces";

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
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
  } = useSeeds(setLoading, showAlert);

  const onEditSeed = (seed: ISeed) => {
    handleEdit(seed)
    handleToggleDrawer("open")
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          dataDrawerTarget={drawerDetailsId}
          onClick={() => handleCreate()}
          className="flex items-center justify-center px-4 py-2.5 text-sm bg-orange-800/40 text-white hover:bg-orange-800/70 rounded-full transition-colors duration-200 hover:shadow-md"
        >
          <SquarePlus className="w-4 h-4 me-2" /> Nueva Semilla
        </Button>
      </div>

      <SeedsTable seeds={seeds} onEdit={onEditSeed} onDelete={handleDelete} />

      <Drawer id={drawerDetailsId} closeButton>
        <BodyFormSeed seed={editingSeed} onSave={handleSave} />
      </Drawer>
    </>
  );
};

export default SeedsPage;
