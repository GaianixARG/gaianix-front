import { useEffect, useState } from "react";
import { infoCampoService } from "../services/infoCamposService";
import type { ILote } from "../constants/interfaces";

const useInfoCampos = () => {
    const [lotes, setLotes] = useState<ILote[]>([]);

    useEffect(() => {
        const fetchLotes = async () => {
        try {
            const response = await infoCampoService.getAllLotes()
            setLotes(response.data)
        } catch {
            return []
        }
    };
    
        fetchLotes();
      }, []);

  return { lotes };
};

export default useInfoCampos;
