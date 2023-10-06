import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ejerciciosFormModel } from '../../Model/ejerciciosFormModel'
import { CreateSubgrupoComponent } from '../create-subgrupo/create-subgrupo.component';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { SubGrupo, SubGrupoResponse } from '../../Model/ejercicioModel';
import { UnitsofmeasurementsModel, UnitsofmeasurementsResponse } from '../../Model/UnitsofmeasurementsModel';
import { CreateEjercicioModel } from '../../Model/createEjercicioModel'
import { TypeRelationModel, TypeRelation } from '../../Model/typeRelation'
import { responseModel } from '../../Model/reponseModel';
import { Toast } from 'src/app/utils/alert_Toast';


@Component({
  selector: 'app-create-ejercicio',
  templateUrl: './create-ejercicio.component.html',
  styleUrls: ['./create-ejercicio.component.scss']
})
export class CreateEjercicioComponent implements OnInit{

  public message: MatDialog;
  public ejercicioForm: FormGroup = new ejerciciosFormModel().formEjercicios();
  public dataSubgrupo: SubGrupo[];
  public dataUnitsofmeasurements: UnitsofmeasurementsModel[];
  public dataCreateEjercicio: CreateEjercicioModel;
  public dataTypeRelation: TypeRelationModel[] = TypeRelation;

  constructor(private dialog: MatDialog,
    private ejerciciosService$: EjercicioServices,
  public dialogRef: MatDialogRef<CreateSubgrupoComponent> ) {}

  ngOnInit() {
    this.message = this.dialog;

    this.getSubGrupos();
    this.unitsofmeasurements();
  }

  onSubmit() {
    if (this.ejercicioForm.valid) {
      const { name, description, abbreviation,
        subgrupo, relationship, cantidad,
      calidadPromedio } = this.ejercicioForm.value;

       this.dataCreateEjercicio = {
        ...this.dataCreateEjercicio,
          Name: name,
          Description: description,
          Abbreviation: abbreviation,
          VisualIllustration: 'imagen.jpg',
          Relationship: relationship,
          SubGrupoID: subgrupo,
          UnidTypes: [
            {
              UnitsofmeasurementID: cantidad,
              Type: this.dataUnitsofmeasurements.find(unit => unit.ID === cantidad )?.Name || 'null'
            },
            {
              UnitsofmeasurementID: calidadPromedio,
              Type: this.dataUnitsofmeasurements.find(unit => unit.ID === cantidad )?.Name || 'null'  
            }
          ],
       }

       this.ejerciciosService$.CreateEjercicio(this.dataCreateEjercicio).
       subscribe( async (res: responseModel) => {
        if (res.success) {
          await Toast.fire({
            icon: 'success',
            title: res.msg
          })
          this.dialogRef.close(true);
       }
       else{
         await Toast.fire({
           icon: 'error',
           title: res.msg
         })
       }
       })
    }
}


unitsofmeasurements():void{
  this.ejerciciosService$.GetAllUnitsofmeasurements().subscribe ( (res: UnitsofmeasurementsResponse) =>{
    this.dataUnitsofmeasurements = res.item;
  })
}

getSubGrupos(): void{
  this.ejerciciosService$.GetSubGrupos().subscribe ( (res: SubGrupoResponse) =>{
    this.dataSubgrupo = res.item;
  })
}

openCrearSubgrupo(): void {
  const dialogRef = new MatDialogConfig (); 
  dialogRef.data = {      
      message: 'Este es un mensaje de texto.'    
  }; 
  dialogRef.width = '517px';
  dialogRef.height = '604px'
  this.dialogRef = this.dialog.open(CreateSubgrupoComponent, dialogRef);

  this.dialogRef.afterClosed().subscribe((result: boolean) => {
    if( result )
    {  this.getSubGrupos();   }
  });
}
}
