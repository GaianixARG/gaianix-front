import { useEffect, useState } from "react";
import type { IFertilizer } from "../constants/interfaces";
import type { FLoading, FShowAlert } from "../constants/types";
import { fertilizerService } from "../services/fertilizerService";

const initialSeed = { id: "", name: "" };

const useFertilizers = (setLoading: FLoading, showAlert: FShowAlert) => {
  const [fertilizers, setFertilizers] = useState<IFertilizer[]>([]);
  const [editingFertilizer, setEditingFertilizer] = useState<IFertilizer>(initialSeed);

  const handleCreate = () => {
    setEditingFertilizer(initialSeed);
  };

  const handleEdit = (fertilizer: IFertilizer) => {
    setEditingFertilizer(fertilizer);
  };

  const handleDelete = (id: string) => {
    setLoading(true)
    fertilizerService.remove(id)
      .then(() => {
        setFertilizers((prev) => prev.filter((s) => s.id !== id));
        showAlert({
          type: "success",
          message: "Fertilizante eliminado correctamente!",
        })
      })
      .catch((err) => {
        showAlert({
          type: "error",
          message: err.message,
        })
      })
      .finally(() => setLoading(false))
  };

  const createNewFertilizer = (fertilizer: IFertilizer) => {
    fertilizerService.create(fertilizer)
      .then((res) => {
          setFertilizers((prev) => [...prev, res.data]);
          showAlert({
            type: "success",
            message: `Fertilizante ${res.data.name} creado correctamente`,
          })
      })
      .catch((err) => {
        showAlert({
          type: "error",
          message: err.message
        })
      })
      .finally(() => setLoading(false))
  }

  const updateFertilizer = (id: string, fertilizer: IFertilizer) => {
    fertilizerService.update(id, fertilizer)
      .then(() => {
          showAlert({
            type: "success",
            message: "Fertilizante actualizado correctamente!",
          })
      })
      .catch(() => {
        showAlert({
          type: "error",
          message: "Error al actualizar el fertilizante"
        })
      })
      .finally(() => setLoading(false))
  }

  const handleSave = (fertilizer: IFertilizer) => {
    if (editingFertilizer.id !== "") {
      updateFertilizer(editingFertilizer.id, fertilizer)
    } else {
      createNewFertilizer(fertilizer)
    }
  };

  useEffect(() => {
      const fetchFertilizer = async () => {
        try {
          setLoading(true)
          const response = await fertilizerService.getAll()
          setFertilizers(response.data)
        } catch (error: any) {
          showAlert({
            type: "error",
            message: error.message,
          })
        } finally {
          setLoading(false)
        }
      };
      fetchFertilizer()
    }, [setLoading, showAlert]);

  return {
    fertilizers,
    editingFertilizer,
    setEditingFertilizer,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
  };
};

export default useFertilizers;
