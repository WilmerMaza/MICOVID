 interface UnitMeasurement {
    UnitsofmeasurementID: string;
    Type: string;
  }
  
  export interface CreateEjercicioCombinateModel {
    Name: string;
    Abbreviation: string;
    Description: string;
    VisualIllustration: string;
    Relationship: string;
    SubGrupoID: string;
    UnidTypes: UnitMeasurement[];
    ListIDExercises: string[];
  }
  