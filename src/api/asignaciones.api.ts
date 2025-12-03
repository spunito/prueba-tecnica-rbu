// src/api/asignaciones.api.ts
import { api } from "./axiosClient";
import type { Desarrollador } from "@/types/desarrollador";

// Asignar un desarrollador a un proyecto
export const asignarDesarrollador = async (
  codigoProyecto: number,
  codigoDesarrollador: number
): Promise<Desarrollador> => {
  const { data } = await api.post(
    `/api/proyectos/${codigoProyecto}/desarrolladores/${codigoDesarrollador}`
  );
  return data;
};

// Desasignar un desarrollador de un proyecto
export const desasignarDesarrollador = async (
  codigoProyecto: number,
  codigoDesarrollador: number
): Promise<Desarrollador> => {
  const { data } = await api.delete(
    `/api/proyectos/${codigoProyecto}/desarrolladores/${codigoDesarrollador}`
  );
  return data;
};

// Obtener desarrolladores asignados a un proyecto
export const getDesarrolladoresDeProyecto = async (
  codigoProyecto: number
): Promise<Desarrollador[]> => {
  const { data } = await api.get(
    `/api/proyectos/${codigoProyecto}/desarrolladores`
  );
  return data;
};
