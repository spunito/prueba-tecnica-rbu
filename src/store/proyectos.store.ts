// src/store/proyectos.store.ts
import { create } from "zustand";
import type { ProyectoState } from "@/types/proyectos";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  reactivateProject,
} from "@/api/proyectos.api";

import {
  asignarDesarrollador,
  desasignarDesarrollador,
  getDesarrolladoresDeProyecto,
} from "@/api/asignaciones.api";

import type { Desarrollador } from "@/types/desarrollador";

// 🔹 Extiende el tipo ProyectoState para incluir los filtros
interface ProyectoStateExtended extends ProyectoState {
  // Estados de filtros
  searchTerm: string;
  filterStatus: string;
  filterDevelopers: string;
  filterDate: string;

  // Acciones de filtros
  setSearchTerm: (term: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterDevelopers: (devs: string) => void;
  setFilterDate: (date: string) => void;
  resetFilters: () => void;
}

export const useProyectoStore = create<ProyectoStateExtended>((set, get) => ({
  projects: [],
  loading: false,
  devsByProject: {}, // ← clave nueva: { [codigoProyecto]: Desarrollador[] }

  // ───────────────────────────────
  // ESTADOS DE FILTROS (NUEVOS)
  // ───────────────────────────────
  searchTerm: "",
  filterStatus: "all",
  filterDevelopers: "all",
  filterDate: "",

  // ───────────────────────────────
  // ACCIONES DE FILTROS (NUEVAS)
  // ───────────────────────────────
  setSearchTerm: (term) => set({ searchTerm: term }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  setFilterDevelopers: (devs) => set({ filterDevelopers: devs }),
  setFilterDate: (date) => set({ filterDate: date }),
  
  resetFilters: () => set({
    searchTerm: "",
    filterStatus: "all",
    filterDevelopers: "all",
    filterDate: "",
  }),

  // ───────────────────────────────
  // CRUD BASICO DE PROYECTOS
  // ───────────────────────────────

  fetchProjects: async () => {
    set({ loading: true });
    const proyectos = await getProjects();

    // 🟦 Agregar número de desarrolladores por proyecto
    const proyectosConConteo = await Promise.all(
      proyectos.map(async (p) => {
        const devs = await getDesarrolladoresDeProyecto(p.codigoProyecto);
        return {
          ...p,
          desarrolladoresAsignados: devs.length,
        };
      })
    );

    set({ projects: proyectosConConteo, loading: false });
  },

  addProject: async (payload) => {
    const newP = await createProject(payload);
    set({ projects: [...get().projects, newP] });
  },

  updateProject: async (id, payload) => {
    const updated = await updateProject(id, payload);

    set({
      projects: get().projects.map((p) =>
        p.codigoProyecto === id ? updated : p
      ),
    });
  },

  deleteProject: async (id) => {
    await deleteProject(id);
    set({
      projects: get().projects.map((p) =>
        p.codigoProyecto === id
          ? { ...p, registroActivo: false }
          : p
      ),
    });
  },

  reactivateProject: async (id) => {
    const updated = await reactivateProject(id);

    set({
      projects: get().projects.map((p) =>
        p.codigoProyecto === id ? updated : p
      ),
    });
  },

  // ───────────────────────────────
  // ASIGNACIONES
  // ───────────────────────────────

  // Cargar desarrolladores asignados a un proyecto
  fetchDevelopersByProject: async (codigoProyecto) => {
    const devs = await getDesarrolladoresDeProyecto(codigoProyecto);

    set({
      devsByProject: {
        ...get().devsByProject,
        [codigoProyecto]: devs,
      },
    });
  },

  // Asignar desarrollador
  assignDeveloper: async (codigoProyecto, codigoDesarrollador) => {
    await asignarDesarrollador(codigoProyecto, codigoDesarrollador);

    // Volver a cargar los devs de ese proyecto
    await get().fetchDevelopersByProject(codigoProyecto);
    
    // 🔹 Actualizar el conteo en la lista de proyectos
    const devs = await getDesarrolladoresDeProyecto(codigoProyecto);
    set({
      projects: get().projects.map((p) =>
        p.codigoProyecto === codigoProyecto
          ? { ...p, desarrolladoresAsignados: devs.length }
          : p
      ),
    });
  },

  // Desasignar desarrollador
  unassignDeveloper: async (codigoProyecto, codigoDesarrollador) => {
    await desasignarDesarrollador(codigoProyecto, codigoDesarrollador);

    // Refrescar lista
    await get().fetchDevelopersByProject(codigoProyecto);
    
    // 🔹 Actualizar el conteo en la lista de proyectos
    const devs = await getDesarrolladoresDeProyecto(codigoProyecto);
    set({
      projects: get().projects.map((p) =>
        p.codigoProyecto === codigoProyecto
          ? { ...p, desarrolladoresAsignados: devs.length }
          : p
      ),
    });
  },
}));