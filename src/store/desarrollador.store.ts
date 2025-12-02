import { getDevelopers, createDeveloper, updateDeveloper, deleteDeveloper, updateDeveloperState } from "@/api/desarrollador.api";
import { create } from "zustand";
import type { DesarrolladorState } from '../types/desarrollador';


export const useDesarrolladorStore = create<DesarrolladorState>((set, get) => ({
  developers: [],
  loading: false,

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
}));
