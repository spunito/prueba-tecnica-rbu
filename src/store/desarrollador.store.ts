// src/store/desarrollador.store.ts
import { create } from "zustand";
import type { DesarrolladorState } from "@/types/desarrollador";
import {
  getDevelopers,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
  updateDeveloperState,
} from "@/api/desarrollador.api";

// 🔹 Extender el tipo para incluir filtros
interface DesarrolladorStateExtended extends DesarrolladorState {
  // Estados de filtros
  searchTerm: string;
  filterExperience: string;
  filterStatus: string;
  filterProjects: string;

  // Acciones de filtros
  setSearchTerm: (term: string) => void;
  setFilterExperience: (exp: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterProjects: (projects: string) => void;
  resetFilters: () => void;
}

export const useDesarrolladorStore = create<DesarrolladorStateExtended>(
  (set, get) => ({
    developers: [],
    loading: false,

    // ───────────────────────────────
    // ESTADOS DE FILTROS (NUEVOS)
    // ───────────────────────────────
    searchTerm: "",
    filterExperience: "all",
    filterStatus: "all",
    filterProjects: "all",

    // ───────────────────────────────
    // ACCIONES DE FILTROS (NUEVAS)
    // ───────────────────────────────
    setSearchTerm: (term) => set({ searchTerm: term }),
    setFilterExperience: (exp) => set({ filterExperience: exp }),
    setFilterStatus: (status) => set({ filterStatus: status }),
    setFilterProjects: (projects) => set({ filterProjects: projects }),

    resetFilters: () =>
      set({
        searchTerm: "",
        filterExperience: "all",
        filterStatus: "all",
        filterProjects: "all",
      }),

    // ───────────────────────────────
    // CRUD BÁSICO
    // ───────────────────────────────

    fetchDevelopers: async () => {
      set({ loading: true });
      const data = await getDevelopers();
      set({ developers: data, loading: false });
    },

    addDeveloper: async (payload) => {
      const newDev = await createDeveloper(payload);
      set({ developers: [...get().developers, newDev] });
    },

    updateDeveloper: async (id, payload) => {
      const updated = await updateDeveloper(id, payload);

      set({
        developers: get().developers.map((d) =>
          d.codigoDesarrollador === id ? updated : d
        ),
      });
    },

    deleteDeveloper: async (id) => {
      const deleted = await deleteDeveloper(id);
      set({
        developers: get().developers.map((d) =>
          d.codigoDesarrollador === id ? deleted : d
        ),
      });
    },

    reactivateDeveloper: async (id: number) => {
      const updated = await updateDeveloperState(id);

      set({
        developers: get().developers.map((d) =>
          d.codigoDesarrollador === id ? updated : d
        ),
      });
    },
  })
);