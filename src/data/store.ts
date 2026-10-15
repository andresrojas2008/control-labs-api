export interface User {
  id: string;
  nombre: string;
  email: string;
  rol: 'estudiante' | 'docente' | 'administrador';
  estado: 'activo' | 'inactivo' | 'eliminado';
  passwordHash: string;
}

export interface Environment {
  id: string;
  nombre: string;
  capacidad: number;
  ubicacion: string;
  estado: 'activo' | 'inactivo';
}

export interface Equipment {
  id: string;
  nombre: string;
  ambienteId: string;
  estadoTecnico: 'operativo' | 'mantenimiento' | 'fuera_de_servicio';
  ubicacion?: string;
}

export interface Incident {
  id: string;
  descripcion: string;
  equipoId?: string;
  ambienteId?: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  estado: 'pendiente' | 'en_proceso' | 'resuelto';
  fechaCreacion: string;
}

export const users: User[] = [];
export const environments: Environment[] = [];
export const equipment: Equipment[] = [];
export const incidents: Incident[] = [];

let nextNumericId = 1;

export function createId(prefix: string): string {
  const id = `${prefix}-${nextNumericId}`;
  nextNumericId += 1;
  return id;
}
