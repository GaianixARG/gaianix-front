import type { IFertilizer } from "../constants/interfaces"
import { useFertilizerStore } from "../store/fertilizerStore"
import { useAlertStore } from "../store/alertStore"

const useFertilizers = () => {
  const showAlert = useAlertStore(state => state.showAlert)

  const updateFertilizer = useFertilizerStore(state => state.updateFertilizer)
  const createNewFertilizer = useFertilizerStore(state => state.createNewFertilizer)
  const deleteFertilizer = useFertilizerStore(state => state.deleteFertilizer)
  
  const handleDelete = async (id: string) => {
    const exito = await deleteFertilizer(id)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? "Fertilizante eliminado correctamente!" : "Error al eliminar el fertilizante",
    })
  }

  const handleCreateNewSeed = async (fertilizer: IFertilizer) => {
    const newFert = await createNewFertilizer(fertilizer)
    const exito = newFert != null
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? `Fertilizante ${newFert.name} creado correctamente!`: "Error al crear el fertilizante",
    })
  }

  const handleUpdateSeed = async (fertilizer: IFertilizer) => {
    const exito = await updateFertilizer(fertilizer)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? "Fertilizante actualizado correctamente!" : "Error al actualizar el fertilizante",
    })
  }

  const handleSave = async (fertilizer: IFertilizer) => {
    if (fertilizer.id !== "") {
      handleUpdateSeed(fertilizer)
    } else {
      handleCreateNewSeed(fertilizer)
    }
  }

  return {
    handleDelete,
    handleSave
  }
}

export default useFertilizers
