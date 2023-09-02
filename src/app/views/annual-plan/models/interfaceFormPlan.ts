export interface PlanAnualForm {
    name: string;
    CategoriumID: string;
    year: string;
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

export interface ReturnInsertPlan {
    msg: string;
}