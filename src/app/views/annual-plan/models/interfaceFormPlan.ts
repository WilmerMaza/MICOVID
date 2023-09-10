export interface PlanAnualForm {
    name?: string;
    CategoriumID?: string;
    year?: string;
}

export interface  RootPlan{
    item: PlanItem[];
}

export interface RootPlanById {
    item: PlanItem;
}

export interface PlanItem {
    ID: string;
    name: string;
    year: string;
    createdAt: string;
    updatedAt: string;
    EntrenadorID: string;
    CategoriumID: string;
    Categorium: {
      ID: string;
      name: string;
      descripcion: string;
      createdAt: string;
      updatedAt: string;
      SportsInstitutionID: string;
    };
}

export interface ReturnInsert {
    msg: string;
}

export interface dialogDataMacro {
    routeId:string,
    dataList?: any,
    action?:string,
    lastDate:string
}

export interface ItemMacro {
    item : MacroDatos[];
}

export interface MacroDatos {
    ID?: string;
    PlanAnualID?: string;
    date_end: string;
    date_initial?: string;
    detail?: string;
    name: string;
}

export interface Item<T>{
    item: T;
}

export interface Microciclo {
    id: number;
    month: string;
    date_initial: Date;
    date_end: Date;
    stages: string;
    number_days: number;
    createdAt: Date;
    updatedAt: Date;
    MacrocicloID: string;
}
  
export interface Macrociclo {
    ID: string;
    name: string;
    detail: string;
    date_initial: Date;
    date_end: Date;
    createdAt: Date;
    updatedAt: Date;
    PlanAnualID: string;
    Microciclos: Microciclo[];
}