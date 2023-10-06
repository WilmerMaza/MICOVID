export interface UnitsofmeasurementsModel
{
    ID: string,
    Name: string,
    Abbreviation: string,
    Description: string
}

export interface UnitsofmeasurementsResponse{
    item: UnitsofmeasurementsModel[];
}