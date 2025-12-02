import { Plus } from "lucide-react"
import { DesarrolladorFiltro } from './components/DesarrolladorFiltro';
import { DesarrolladorLista } from './components/DesarrolladorLista';
import { useEffect, useState } from "react";
import { useDesarrolladorStore } from "@/store/desarrollador.store";
import { DesarrolladorModal } from "@/modals/DesarrolladorModal";


export function Desarrollador() {
  const fetchDevelopers = useDesarrolladorStore((s) => s.fetchDevelopers);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    fetchDevelopers();
  }, [fetchDevelopers]);
  
  

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Desarrolladores</h1>
          <p className="text-muted-foreground mt-1">Gestiona tu equipo de desarrolladores</p>
        </div>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus size={20} />
          Nuevo Desarrollador
        </button>
      </div>

      {/* Filtros y búsqueda */}
      
        <DesarrolladorFiltro />

      {/* Lista */}
        <DesarrolladorLista />
      
      {/* Modal */}
      <DesarrolladorModal open={open} onClose={() => setOpen(false)} />
      </div>
  )
}
