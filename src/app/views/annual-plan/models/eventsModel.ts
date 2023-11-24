export interface events {
  title: string;
  start: string;
  end?: string;
  position?: number;
  durationDays?: number;
  color?:string;
}

export interface itemEvents {
  title: string;
  start: string;
  end: string;
  position: number;
  durationDays: number;
  color: string;
}

export interface modalDataEvent {
  isVisible: boolean;
  data: Data;
  nameMacro: string;
}

export interface Data {
  ID: string;
  number_micro: string;
  month: string;
  date_initial: string;
  date_end: string;
  stages: string;
  number_days: string;
  createdAt: string;
  updatedAt: string;
  MacrocicloID: string;
}

export type Events = itemEvents[];

export interface fechaTask {
  number: number;
  dia?: string;
  mes?: string;
  fecha?: string;
}

export interface Tarea {
  name: string;
}

export interface TareasMicrociclo {
  fechaInicio: string;
  fechaFin: string;
  Tarea: Tarea;
}

export interface dataModelAssing {
  tareas: Tarea[];
  fecha: Fecha;
  MicrocicloID: string;
}

export interface Tarea {
  ID: string;
  name: string;
  color: string;
  describe: string;
  createdAt: string;
  updatedAt: string;
  EntrenadorID: string;
}

export interface Fecha {
  number: number;
  dia: string;
  mes: string;
  fecha: string;
}
