import { Plus} from "lucide-react"
import { ProyectoFiltros } from './components/ProyectoFiltros';
import { ProyectoLista } from './components/ProyectoLista';
import { useProyectoStore } from "@/store/proyectos.store";
import { useEffect, useState } from "react";
import { ProyectoModal } from "@/modals/ProyectoModal";


export const Proyectos = () => {
  const fetchProjects = useProyectoStore((s) => s.fetchProjects);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);
  

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proyectos</h1>
          <p className="text-muted-foreground mt-1">Administra todos tus proyectos</p>
        </div>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
          <Plus size={20} />
          Nuevo Proyecto
        </button>
      </div>

      {/* Filtros y búsqueda */}
        <ProyectoFiltros />
      {/* Lista */}
        <ProyectoLista />
      {/* Modal */}
      <ProyectoModal open={open} onClose={() => setOpen(false)} />
      
    </div>
  )
}
