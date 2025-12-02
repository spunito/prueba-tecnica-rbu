import { useProyecto } from "@/hooks/useProyecto"
import { Search } from "lucide-react"


export const ProyectoFiltros = () => {
    const {searchTerm,
        setSearchTerm,
        filterStatus,
        setFilterStatus,
        filterDevelopers,
        setFilterDevelopers,
        } = useProyecto()
 
    return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Búsqueda</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Nombre del proyecto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Estado</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todos</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Fechas</label>
            <input className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary" type="date" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Desarrolladores</label>
            <select
              value={filterDevelopers}
              onChange={(e) => setFilterDevelopers(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todos</option>
              <option value="few">1-2 desarrolladores</option>
              <option value="medium">3-4 desarrolladores</option>
              <option value="many">5+ desarrolladores</option>
            </select>
          </div>
        </div>
      </div>
  )
}
