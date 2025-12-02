import { create } from "zustand";
import type { ProyectoState } from "../types/proyectos";
import { getProjects, createProject, updateProject, deleteProject, reactivateProject} from "@/api/proyectos.api";


export const useProyectoStore = create<ProyectoState>((set, get) => ({
  projects: [],
  loading: false,

  fetchProjects: async () => {
    set({ loading: true });
    const data = await getProjects();
    set({ projects: data, loading: false });
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
      projects: get().projects.filter((p) => p.codigoProyecto !== id),
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
}));
