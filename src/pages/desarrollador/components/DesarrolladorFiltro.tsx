// src/components/desarrolladores/DesarrolladorFiltro.tsx
import { useDesarrollador } from "@/hooks/useDesarrollador";
import { Search, X } from "lucide-react";

export const DesarrolladorFiltro = () => {
  const {
    searchTerm,
    setSearchTerm,
    filterExperience,
    setFilterExperience,
    filterStatus,
    setFilterStatus,
    filterProjects,
    setFilterProjects,
    resetFilters,
  } = useDesarrollador();

  // Verificar si hay filtros activos
  const hasActiveFilters =
    searchTerm !== "" ||
    filterExperience !== "all" ||
    filterStatus !== "all" ||
    filterProjects !== "all";

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-4">
      {/* Header con botón de limpiar */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Filtros</h3>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <X size={14} />
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Grid de filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Búsqueda por nombre */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Búsqueda
          </label>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Nombre del desarrollador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Filtro por experiencia */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Experiencia
          </label>
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

        {/* Filtro por estado */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Estado
          </label>
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

        {/* Filtro por número de proyectos */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Número de proyectos
          </label>
          <select
            value={filterProjects}
            onChange={(e) => setFilterProjects(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Todos</option>
            <option value="few">1-2 proyectos</option>
            <option value="medium">3-4 proyectos</option>
            <option value="many">5+ proyectos</option>
          </select>
        </div>
      </div>

      {/* Indicador de resultados */}
      {hasActiveFilters && (
        <div className="text-xs text-muted-foreground">
          Filtros activos aplicados
        </div>
      )}
    </div>
  );
};