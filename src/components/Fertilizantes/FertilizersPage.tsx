import { SquarePlus } from "lucide-react"
import Button from "../ui/Button"
import Drawer from "../ui/Drawer/Drawer"
import BodyFormFertilizer from "./BodyFormFertilizer"
import useFertilizers from "../../hooks/useFertilizers"
import FertilizersTable from "./FertilizersTable"
import useButton from "../../hooks/useButton"
import { useFertilizerStore } from "../../store/fertilizerStore"

const drawerDetailsId = "drawer-fertilizer"

const FertilizersPage = () => {
  const { handleToggleDrawer } = useButton({
    dataDrawerTarget: drawerDetailsId
  })

  const {
    handleDelete,
    handleSave,
  } = useFertilizers()

  const selectFertilizer = useFertilizerStore(state => state.selectFertilizer)
  const onEditFertilizer = (fertId: string) => {
    selectFertilizer(fertId)
    handleToggleDrawer("open")
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => onEditFertilizer("")}
          tipo="tertiary"
          className="flex items-center justify-center px-4 py-2.5 text-sm text-white rounded-xl transition-colors duration-200 hover:shadow-md"
        >
          <SquarePlus className="w-4 h-4 me-2" /> Nuevo Fertilizante
        </Button>
      </div>

      <FertilizersTable onEdit={onEditFertilizer} onDelete={handleDelete} />

      <Drawer id={drawerDetailsId} closeButton>
        <BodyFormFertilizer onSave={handleSave} />
      </Drawer>
    </>
  )
}

export default FertilizersPage
