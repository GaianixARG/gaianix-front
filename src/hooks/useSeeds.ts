import { useEffect, useState } from "react";
import type { ISeed } from "../constants/interfaces";
import type { FLoading, FShowAlert } from "../constants/types";
import { seedService } from "../services/seedService";
import { ESeed } from "../constants/enums";

const initialSeed = { id: "", name: "", type: ESeed.Maiz, provider: "" };

const useSeeds = (setLoading: FLoading, showAlert: FShowAlert) => {
  const [seeds, setSeeds] = useState<ISeed[]>([]);
  const [editingSeed, setEditingSeed] = useState<ISeed>(initialSeed);

  const handleCreate = () => {
    setEditingSeed(initialSeed);
  };

  const handleEdit = (seed: ISeed) => {
    setEditingSeed(seed);
  };

  const handleDelete = (id: string) => {
    setLoading(true)
    seedService.remove(id)
      .then(() => {
        setSeeds((prev) => prev.filter((s) => s.id !== id));
        showAlert({
          type: "success",
          message: "Semilla eliminada correctamente!",
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

  const createNewSeed = (seed: ISeed) => {
    seedService.create(seed)
        .then((res) => {
          setSeeds((prev) => [...prev, res.data]);
          showAlert({
            type: "success",
            message: `Semilla ${res.data.name} creada correctamente`,
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

  const updateSeed = (id: string, seed: ISeed) => {
    seedService.update(id, seed)
        .then((res) => {
          setSeeds((prev) => prev.map((s) => (s.id === seed.id ? res.data : s)));
          showAlert({
            type: "success",
            message: "Semilla actualizada correctamente!",
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

  const handleSave = (seed: ISeed) => {
    if (editingSeed.id !== "") {
      updateSeed(editingSeed.id, seed)
    } else {
      // create
      createNewSeed(seed)
    }
  };

  useEffect(() => {
      const fetchSeeds = async () => {
        try {
          setLoading(true)
          const response = await seedService.getAll()
          setSeeds(response.data)
        } catch (error: any) {
          showAlert({
            type: "error",
            message: error.message,
          })
        } finally {
          setLoading(false)
        }
      };
      fetchSeeds()
    }, [setLoading, showAlert]);

  return {
    seeds,
    editingSeed,
    handleCreate,
    handleEdit,
    handleDelete,
    handleSave,
  };
};

export default useSeeds;
