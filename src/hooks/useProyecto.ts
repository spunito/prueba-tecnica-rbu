// src/hooks/useProyecto.ts
import { useProyectoStore } from "@/store/proyectos.store";
import { useMemo } from "react";

export const useProyecto = () => {
  // 🔹 Obtener proyectos y estados de filtros del store
  const projects = useProyectoStore((s) => s.projects);
  const searchTerm = useProyectoStore((s) => s.searchTerm);
  const filterStatus = useProyectoStore((s) => s.filterStatus);
  const filterDevelopers = useProyectoStore((s) => s.filterDevelopers);
  const filterDate = useProyectoStore((s) => s.filterDate);

  // 🔹 Obtener acciones de filtros del store
  const setSearchTerm = useProyectoStore((s) => s.setSearchTerm);
  const setFilterStatus = useProyectoStore((s) => s.setFilterStatus);
  const setFilterDevelopers = useProyectoStore((s) => s.setFilterDevelopers);
  const setFilterDate = useProyectoStore((s) => s.setFilterDate);
  const resetFilters = useProyectoStore((s) => s.resetFilters);

  // 🔹 Calcular proyectos filtrados
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Filtro por nombre
      const matchesName = p.nombre
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Filtro por estado
      const matchesStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "active"
          ? p.registroActivo === true
          : p.registroActivo === false;

      // Filtro por cantidad de desarrolladores
      const devCount = p.desarrolladoresAsignados ?? 0;
      const matchesDevelopers =
        filterDevelopers === "all"
          ? true
          : filterDevelopers === "few"
          ? devCount >= 1 && devCount <= 2
          : filterDevelopers === "medium"
          ? devCount >= 3 && devCount <= 4
          : devCount >= 5;

      // Filtro por fecha de inicio
      const matchesDate =
        filterDate === ""
          ? true
          : new Date(p.fechaInicio).toISOString().split("T")[0] === filterDate;

      return matchesName && matchesStatus && matchesDevelopers && matchesDate;
    });
  }, [projects, searchTerm, filterStatus, filterDevelopers, filterDate]);

  return {
    // Estados
    searchTerm,
    filterStatus,
    filterDevelopers,
    filterDate,
    filteredProjects,

    // Acciones
    setSearchTerm,
    setFilterStatus,
    setFilterDevelopers,
    setFilterDate,
    resetFilters,
  };
};