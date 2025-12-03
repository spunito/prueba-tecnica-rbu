// src/hooks/useDesarrollador.ts
import { useDesarrolladorStore } from "@/store/desarrollador.store";
import { useMemo } from "react";

export const useDesarrollador = () => {
  // 🔹 Obtener desarrolladores y estados de filtros del store
  const developers = useDesarrolladorStore((s) => s.developers);
  const searchTerm = useDesarrolladorStore((s) => s.searchTerm);
  const filterExperience = useDesarrolladorStore((s) => s.filterExperience);
  const filterStatus = useDesarrolladorStore((s) => s.filterStatus);
  const filterProjects = useDesarrolladorStore((s) => s.filterProjects);

  // 🔹 Obtener acciones de filtros del store
  const setSearchTerm = useDesarrolladorStore((s) => s.setSearchTerm);
  const setFilterExperience = useDesarrolladorStore((s) => s.setFilterExperience);
  const setFilterStatus = useDesarrolladorStore((s) => s.setFilterStatus);
  const setFilterProjects = useDesarrolladorStore((s) => s.setFilterProjects);
  const resetFilters = useDesarrolladorStore((s) => s.resetFilters);

  // 🔹 Calcular desarrolladores filtrados
  const filteredDevelopers = useMemo(() => {
    return developers.filter((dev) => {
      // Filtro por nombre
      const matchesName = dev.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filtro por estado
      const matchesStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "active"
          ? dev.registroActivo === true
          : dev.registroActivo === false;

      // Filtro por experiencia
      const experience = dev.aniosExperiencia ?? 0;
      const matchesExperience =
        filterExperience === "all"
          ? true
          : filterExperience === "junior"
          ? experience >= 0 && experience <= 3
          : filterExperience === "mid"
          ? experience >= 4 && experience <= 7
          : experience >= 8;

      // Filtro por número de proyectos (si tienes este campo)
      const projectCount = dev.proyectosAsignados ?? 0;
      const matchesProjects =
        filterProjects === "all"
          ? true
          : filterProjects === "few"
          ? projectCount >= 1 && projectCount <= 2
          : filterProjects === "medium"
          ? projectCount >= 3 && projectCount <= 4
          : projectCount >= 5;

      return matchesName && matchesStatus && matchesExperience && matchesProjects;
    });
  }, [developers, searchTerm, filterStatus, filterExperience, filterProjects]);

  return {
    // Estados
    searchTerm,
    filterExperience,
    filterStatus,
    filterProjects,
    filteredDevelopers,

    // Acciones
    setSearchTerm,
    setFilterExperience,
    setFilterStatus,
    setFilterProjects,
    resetFilters,
  };
};