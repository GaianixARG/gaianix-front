import { useEffect } from "react";
import Map from "../components/Map/Map";
import PrivateLayout from "../layouts/PrivateLayout";
import { CREATE_LOTE_ID_VALUE, useLoteStore } from "../store/loteStore";
import CardLote from "../components/Lotes/CardLote";
import { useLoteDetails } from "../hooks/useLoteDetails";
import { useMapStore } from "../store/mapStore";

const Lotes = () => {
  const lotes = useLoteStore(state => state.lotes)
  const fetchLotes = useLoteStore(state => state.fetchLotes)
 
  useEffect(() => {
    fetchLotes()
  }, [fetchLotes])
    
  const setSelectedLote = useLoteStore(state => state.setSelectedLote)
  const flyToLote = useMapStore(state => state.flyToLote)
  const handleClickLote = (loteId: string) => {
    setSelectedLote(loteId)
    const loteSeleccionado = lotes.find(l => l.id === loteId)
    if (loteSeleccionado) flyToLote(loteSeleccionado)
  }
  
  const editingLoteId = useLoteStore(state => state.editingLoteId)
  const setEditingLoteId = useLoteStore(state => state.setEditingLoteId)
  
  const { handleSaveLote, handleCancelEdit } = useLoteDetails()

  return (
    <PrivateLayout>
      <section className="grow grid grid-cols-1 grid-rows-(--my-grid-rows) lg:grid-rows-1 lg:grid-cols-(--my-grid-cols) gap-1 p-1 bg-primary-light shadow">
        <Map lotes={lotes}  />
        <div className="flex flex-col gap-2 space-between py-1">
          <ul role="list" className="overflow-auto max-h-80 lg:max-h-[85vh] grow">
            {lotes.map((l) => (
              <CardLote 
                key={l.id} 
                lote={l}
                onClick={handleClickLote}
                isEditing={editingLoteId === l.id}
                onEdit={setEditingLoteId}
                onSave={handleSaveLote}
                onCancelEdit={handleCancelEdit}
              />
            ))}

            {editingLoteId === CREATE_LOTE_ID_VALUE &&
              <CardLote
                isEditing
                onClick={handleClickLote}
                onSave={handleSaveLote}
                onCancelEdit={handleCancelEdit}
              />
            }
          </ul>
          {/* <Button
            onClick={handleNewLote}
            tipo="tertiary"
            className="flex items-center justify-center px-4 py-2.5 text-sm text-white rounded-xl transition-colors duration-200 hover:shadow-md"
          >
            <Grid2x2Plus className="w-4 h-4 me-2" /> Nuevo Lote
          </Button> */}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default Lotes;
