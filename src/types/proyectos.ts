export interface Proyecto {
    codigoProyecto: number,
    nombre: string,
    fechaInicio: string,
    fechaTermino: string,
    registroActivo: boolean
}

export interface ProyectoState {
  projects: Proyecto[];
  loading: boolean;
  fetchProjects: () => Promise<void>;
  addProject: (payload: Partial<Proyecto>) => Promise<void>;
  updateProject: (id: number, payload: Partial<Proyecto>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  reactivateProject: (id: number) => Promise<void>;
}