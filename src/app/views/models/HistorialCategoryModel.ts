import { Sportsman } from "./DataSportsman";

export interface HistorialCategory {
    id: number;
    FechaInicio: string;
    FechaFin: string;
    CategoriumID: string;
    SportsManID: string;
    categoryName: string;
  }

  export interface visible {
    isVisible: boolean;
    data?: Sportsman;
  }