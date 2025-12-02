import { api } from "./axiosClient";
import type { Proyecto } from '../types/proyectos';


// Obtener todos los proyectos
export const getProjects = async (): Promise<Proyecto[]> => {
  const { data } = await api.get("/api/proyectos");
  return data;
};

// Obtener proyecto por ID
export const getProjectById = async (id: number): Promise<Proyecto> => {
  const { data } = await api.get(`/api/proyectos/${id}`);
  return data;
};

// Crear proyecto
export const createProject = async (
  payload: Partial<Proyecto>
): Promise<Proyecto> => {
  const { data } = await api.post("/api/proyectos", payload);
  return data;
};

// Actualizar proyecto
export const updateProject = async (
  id: number,
  payload: Partial<Proyecto>
): Promise<Proyecto> => {
  const { data } = await api.put(`/api/proyectos/${id}`, payload);
  return data;
};

// Eliminar proyecto (soft delete)
export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/api/proyectos/${id}`);
};

// Reactivar proyecto
export const reactivateProject = async (id: number): Promise<Proyecto> => {
  const { data } = await api.patch(`/api/proyectos/${id}/reactivar`);
  return data;
};
