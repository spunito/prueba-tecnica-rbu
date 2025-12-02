
export interface Desarrollador {
    codigoDesarrollador: number,
    nombre: string,
    rut: string,
    correoElectronico: string,
    fechaContratacion: string,
    aniosExperiencia: number,
    registroActivo: boolean
}

export interface DesarrolladorState {
  developers: Desarrollador[];
  loading: boolean;

  fetchDevelopers: () => Promise<void>;
  addDeveloper: (payload: Partial<Desarrollador>) => Promise<void>;
  updateDeveloper: (id: number, payload: Partial<Desarrollador>) => Promise<void>;
  deleteDeveloper: (id: number) => Promise<void>;
  reactivateDeveloper: (id: number) => Promise<void>;
  
}