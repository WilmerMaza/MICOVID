import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { Ejercicio } from '../../Model/ejercicioModel';

@Component({
  selector: 'app-view-ejericio',
  templateUrl: './view-ejericio.component.html',
  styleUrls: ['./view-ejericio.component.scss']
})
export class ViewEjericioComponent {

  public showFullDescription: boolean = false;
  public  maxLength: number = 150;

  constructor(private dialog: MatDialog,
    private ejerciciosService$: EjercicioServices,
    private dialogRef: MatDialogRef<ViewEjericioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ejercicio ) { 
         }

  toggleDescription(): void {
      this.showFullDescription = !this.showFullDescription;
  }

  cerrar(): void {
    this.dialogRef.close(true);
  }
  
  abrirImagen(): void {
    const dialogRef = this.dialog.open(ImagenModalComponent, {
      data: { imagenUrl: '../../../../../assets/images/ejemploEjercicio.png' },
      maxWidth: '90%',
      maxHeight: '90%'
    });
  }
}

@Component({
  selector: 'app-imagen-modal',
  template: `
    <img [src]="data.imagenUrl" alt="Imagen en grande" style="max-width: 100%; max-height: 100%;" />
  `
})
export class ImagenModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imagenUrl: string }) { }
}