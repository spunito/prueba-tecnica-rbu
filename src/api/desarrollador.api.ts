import { api } from "./axiosClient";
import type { Desarrollador } from "@/types/desarrollador";

// Retorna una lista de desarrolladores
export const getDevelopers = async (): Promise<Desarrollador[]> => {
  const { data } = await api.get("/api/desarrolladores");
  return data;
};

// Obtener desarrollador por ID
export const getDeveloperById = async (id: number): Promise<Desarrollador> => {
  const { data } = await api.get(`/api/desarrolladores/${id}`);
  return data;
};

// Crear Desarrollador
export const createDeveloper = async (
  payload: Partial<Desarrollador>
): Promise<Desarrollador> => {
  const { data } = await api.post("/api/desarrolladores", payload);
  return data;
};

// Actualizar Desarrollador
export const updateDeveloper = async (
  id: number,
  payload: Partial<Desarrollador>
): Promise<Desarrollador> => {
  const { data } = await api.put(`/api/desarrolladores/${id}`, payload);
  return data;
};

// Eliminar Desarrollador
export const deleteDeveloper = async (id: number): Promise<Desarrollador> => {
  const { data } = await api.delete(`/api/desarrolladores/${id}`);
  return data; // <- viene el dev con registroActivo = false
};

// Reactivar Desarrollador
export const updateDeveloperState = async (id: number): Promise<Desarrollador> => {
  const { data } = await api.put(`/api/desarrolladores/${id}/reactivar`);
  return data;
};
