// src/types/desarrollador.ts

export interface Desarrollador {
  codigoDesarrollador: number;
  nombre: string;
  rut: string;
  correoElectronico: string;
  fechaContratacion: string;
  aniosExperiencia: number;
  registroActivo: boolean;
  proyectosAsignados?: number; // 
}

export interface DesarrolladorState {
  developers: Desarrollador[];
  loading: boolean;

  // Estados de filtros
  searchTerm: string;
  filterExperience: string;
  filterStatus: string;
  filterProjects: string;

  // CRUD básico
  fetchDevelopers: () => Promise<void>;
  addDeveloper: (payload: Omit<Desarrollador, "codigoDesarrollador" | "registroActivo">) => Promise<void>;
  updateDeveloper: (id: number, payload: Partial<Desarrollador>) => Promise<void>;
  deleteDeveloper: (id: number) => Promise<void>;
  reactivateDeveloper: (id: number) => Promise<void>;

  // Acciones de filtros
  setSearchTerm: (term: string) => void;
  setFilterExperience: (exp: string) => void;
  setFilterStatus: (status: string) => void;
  setFilterProjects: (projects: string) => void;
  resetFilters: () => void;
}