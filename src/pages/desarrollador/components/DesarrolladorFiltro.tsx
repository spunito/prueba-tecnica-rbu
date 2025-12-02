import { useDesarrollador } from "@/hooks/useDesarrollador"
import { Search } from "lucide-react"

export const DesarrolladorFiltro = () => {
    const {searchTerm,setSearchTerm,filterExperience,setFilterExperience,filterStatus,setFilterStatus} = useDesarrollador()
  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-foreground mb-2">Búsqueda</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Nombre que busca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Experiencia</label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Todos</option>
              <option value="junior">Junior (0-3 años)</option>
              <option value="mid">Mid (4-7 años)</option>
              <option value="senior">Senior (8+ años)</option>
            </select>
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
            <label className="block text-sm font-medium text-foreground mb-2">Numero de proyectos</label>
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">---</option>
              <option value="junior">1-2</option>
              <option value="mid">3-4</option>
              <option value="senior">5+</option>
            </select>
          </div>
        </div>
      </div>
  )
}
