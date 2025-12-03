// src/types/proyectos.ts

import type { Desarrollador } from "./desarrollador";

export interface Proyecto {
  codigoProyecto: number;
  nombre: string;
  fechaInicio: string;
  fechaTermino: string;
  registroActivo: boolean;
  desarrolladoresAsignados?: number;
}

export interface ProyectoState {
  projects: Proyecto[];
  loading: boolean;
  devsByProject: { [codigoProyecto: number]: Desarrollador[] };

  fetchProjects: () => Promise<void>;
  addProject: (data: Partial<Proyecto>) => Promise<void>;
  updateProject: (id: number, data: Partial<Proyecto>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  reactivateProject: (id: number) => Promise<void>;

  // NEW ↓↓↓
  fetchDevelopersByProject: (codigoProyecto: number) => Promise<void>;
  assignDeveloper: (codigoProyecto: number, codigoDesarrollador: number) => Promise<void>;
  unassignDeveloper: (codigoProyecto: number, codigoDesarrollador: number) => Promise<void>;
}
