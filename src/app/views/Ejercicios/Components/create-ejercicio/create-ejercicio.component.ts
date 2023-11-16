import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ejerciciosFormModel } from '../../Model/ejerciciosFormModel'
import { CreateSubgrupoComponent } from '../create-subgrupo/create-subgrupo.component';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { Ejercicio, SubGrupo, SubGrupoResponse, combinateDialogModel } from '../../Model/ejercicioModel';
import { UnitsofmeasurementsModel, UnitsofmeasurementsResponse } from '../../Model/UnitsofmeasurementsModel';
import { CreateEjercicioModel } from '../../Model/createEjercicioModel'
import { TypeRelationModel, TypeRelation } from '../../Model/typeRelation'
import { responseModel, responseUploadMode } from '../../Model/reponseModel';
import { Toast } from 'src/app/utils/alert_Toast';
import { Validators } from 'src/app/utils/Validators';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';


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
  public submitted: boolean = false;
  public tittleName: string;
  public selectedImageURL: string = '';
  public selectedFiles: File;
  public selectFile: File;
  public imageSelected: boolean = false;


  constructor(private dialog: MatDialog,
    private ejerciciosService$: EjercicioServices,
  public dialogRef: MatDialogRef<CreateSubgrupoComponent>,
  @Inject(MAT_DIALOG_DATA) public data: combinateDialogModel,
  private imagenFuntionsService$: ImagenFuntionsService
  )   {   }

  ngOnInit() {
    this.message = this.dialog;
    this.getSubGrupos();
    this.unitsofmeasurements();
    this.tittle();
  }

  tittle(): void{
    const { combinate,
       } = this.data;    
    this.tittleName = combinate ? 'Crear ejercicio combinado' : 'Crear ejercicio'
  }

  onSubmit() {
    if (this.submitted && this.ejercicioForm.valid) {
      const { name, description, abbreviation,
        subgrupo, relationship, cantidad,
      calidadPromedio, image } = this.ejercicioForm.value;

       this.dataCreateEjercicio = {
        ...this.dataCreateEjercicio,
          Name: name,
          Description: description,
          Abbreviation: abbreviation,
          VisualIllustration: Validators.isNullOrUndefined(this.selectedFiles)
          ? 'imagen.jpg'
          : this.selectedFiles.name,
          Relationship: relationship,
          SubGrupoID: subgrupo,
          UnidTypes: [
            {
              UnitsofmeasurementID: cantidad,
              Type: 'cantidad'
            },
            {
              UnitsofmeasurementID: calidadPromedio,
              Type: 'calidad'
            }
          ],
       }
       const formData = new FormData();
       if (!Validators.isNullOrUndefined(this.selectedFiles)) {
        formData.append('file', this.selectedFiles);
      }
        const { combinate,
          dataEjercicios } = this.data;
       if( combinate ){
        this.dataCreateEjercicio.ListIDExercises = dataEjercicios.map((item: Ejercicio) => item.ID);   
       }

       this.ejerciciosService$[
        combinate ? 'CreateEjercicioCombinate' : 'CreateEjercicio' ]
        (this.dataCreateEjercicio).
       subscribe( async (res: responseModel) => {
        if (res.success) {
          if (!Validators.isNullOrUndefined(this.selectedFiles)) {
            this.uploadImg(formData);
          } 
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

removeImage(): void{
  this.selectedFiles = this.selectFile;
  this.selectedImageURL = '';
}

uploadImg(formData: FormData): void {
  this.imagenFuntionsService$.subirImg(formData).subscribe(
    (respuesta: responseUploadMode) => {
      Toast.fire({
        icon: 'success',
        title: respuesta.msg,
      });
      this.dialogRef.close(true);
    },
    (respError): void => {
      const {
        error: { error },
      } = respError;
      Toast.fire({
        icon: 'error',
        title: error,
      });
    }
  );
}

onCreateEjercicio(): void {
  this.submitted = true;
  this.onSubmit();
}

unitsofmeasurements():void{
  this.ejerciciosService$.GetAllUnitsofmeasurements().subscribe ( (res: UnitsofmeasurementsResponse) =>{
    this.dataUnitsofmeasurements = res.item;
  })
}

cerrar(): void {
  this.dialogRef.close(true);
}

getSubGrupos(): void{
  this.ejerciciosService$.GetSubGrupos().subscribe ( (res: SubGrupoResponse) =>{
    this.dataSubgrupo = res.item;
  })
}

onFilesSelected(event: any): void {
  const {
    target: { files },
  } = event;

  this.selectedFiles = files[0];

  const file = files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImageURL = e.target.result;
      this.imageSelected = true; // Establecer imageSelected en true
    };
    reader.readAsDataURL(file);
  }
}

openCrearSubgrupo(): void {
  const dialogRef = new MatDialogConfig (); 
  dialogRef.data = {      
      message: 'Este es un mensaje de texto.'    
  }; 
  dialogRef.width = '480px';
  dialogRef.height = '605px'
  this.dialogRef = this.dialog.open(CreateSubgrupoComponent, dialogRef);

  this.dialogRef.afterClosed().subscribe((result: boolean) => {
    if( result )
    {  this.getSubGrupos();   }
  });
}
}
