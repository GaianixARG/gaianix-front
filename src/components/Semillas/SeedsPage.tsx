import { SquarePlus } from "lucide-react"
import SeedsTable from "./SeedsTable"
import BodyFormSeed from "./BodyFormSeed"
import useSeeds from "../../hooks/useSeeds"
import Button from "../ui/Button"
import Drawer from "../ui/Drawer/Drawer"
import useButton from "../../hooks/useButton"
import { useSeedStore } from "../../store/seedStore"

const drawerDetailsId = "drawer-seed"

const SeedsPage = () => {
  const { handleToggleDrawer } = useButton({
    dataDrawerTarget: drawerDetailsId
  })
  const {
    handleDelete,
    handleSave,
  } = useSeeds()

  const selectSeed = useSeedStore(state => state.selectSeed)
  const onEditSeed = (seedId: string) => {
    selectSeed(seedId)
    handleToggleDrawer("open")
  }

  return (
    <>
      <div className="flex justify-end mb-6">
        <Button
          onClick={() => onEditSeed("")}
          className="flex items-center justify-center px-4 py-2.5 text-sm bg-orange-800/40 text-white hover:bg-orange-800/70 rounded-full transition-colors duration-200 hover:shadow-md"
        >
          <SquarePlus className="w-4 h-4 me-2" /> Nueva Semilla
        </Button>
      </div>

      <SeedsTable onEdit={onEditSeed} onDelete={handleDelete} />

      <Drawer id={drawerDetailsId} closeButton>
        <BodyFormSeed onSave={handleSave} />
      </Drawer>
    </>
  )
}

export default SeedsPage
