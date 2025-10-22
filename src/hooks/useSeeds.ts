import type { ISeed } from "../constants/interfaces";
import { useAlertStore } from "../store/alertStore";
import { useSeedStore } from "../store/seedStore";

const useSeeds = () => {
  const showAlert = useAlertStore(state => state.showAlert)

  const updateSeed = useSeedStore(state => state.updateSeed)
  const createNewSeed = useSeedStore(state => state.createNewSeed)
  const deleteSeed = useSeedStore(state => state.deleteSeed)


  const handleDelete = async (id: string) => {
    const exito = await deleteSeed(id)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? "Semilla eliminada correctamente!" : "Error al eliminar la semilla",
    })
  };

  const handleCreateNewSeed = async (seed: ISeed) => {
    const newSeed = await createNewSeed(seed)
    const exito = newSeed != null
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? `Semilla ${newSeed.name} creada correctamente!`: "Error al crear la semilla",
    })
  }

  const handleUpdateSeed = async (seed: ISeed) => {
    const exito = await updateSeed(seed)
    showAlert({
      type: exito ? "success" : "error",
      message: exito ? "Semilla actualizada correctamente!" : "Error al actualizar la semilla",
    })
  }

  const handleSave = async (seed: ISeed) => {
    if (seed.id !== "") {
      handleUpdateSeed(seed)
    } else {
      handleCreateNewSeed(seed)
    }
  };

  return {
    handleDelete,
    handleSave
  };
};

export default useSeeds;
