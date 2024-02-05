import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { regExps } from 'src/app/utils/Validators';
import { Toast } from 'src/app/utils/alert_Toast';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { Sportsman } from 'src/app/views/models/DataSportsman';
import { columnsTableAsign } from '../../Model/columnTableAsing';
import { Ejercicio, asingDeportista } from '../../Model/ejercicioModel';
import { EjercicioServices } from '../../services/ejercicioServices.service';
@Component({
  selector: 'app-asignDeportista',
  templateUrl: './asignDeportista.component.html',
  styleUrls: ['./asignDeportista.component.scss'],
})
export class AsignDeportistaComponent implements OnInit {
  public column = columnsTableAsign;
  public textForm: FormGroup;
  public clearInput: boolean = false;
  public isLarge: boolean = false;
  public imageUrl: string = '';
  public dataSportman: Sportsman[] = [];
  public sportSelect: Sportsman[] = [];
  public exerciesSelect: Ejercicio[] = [];
  public imageDefault: string = 'default.png';

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: asingDeportista,
    private imagenFuntionsService$: ImagenFuntionsService,
    private ejercicioServices$: EjercicioServices
  ) {
    this.textForm = this.formBuilder.group({
      textInput: ['', Validators.pattern(regExps['special'])],
    });
  }

  ngOnInit(): void {
    this.getSporman();
  }

  getSporman(): void {
    const { sportman, exercise } = this.data;
    this.dataSportman = sportman;
    this.exerciesSelect = exercise;
  }
  getActionEvent(event: ActionResponse) {
    const { action, data } = event;
    this.sportSelect = data;

    if (this.sportSelect.length > 0) {
      this.viewImage(this.sportSelect);
    }
  }

  async viewImage(data: Sportsman[]): Promise<void> {
    const imagePromises: Promise<void>[] = [];

    data.forEach((Sportsman: Sportsman, index: number) => {
      const { image } = Sportsman;
      if (
        image !== this.imageDefault &&
        image &&
        !image.includes('data:image')
      ) {
        const imageLoader = new ImageLoader(this.imagenFuntionsService$);
        const imagePromise = new Promise<void>((resolve) => {
          imageLoader.loadImage(image, (imageUrl) => {
            this.sportSelect[index].image = imageUrl;
            resolve();
          });
        });
        imagePromises.push(imagePromise);
      }
    });

    await Promise.all(imagePromises);
  }

  isImgBase = (image: string): boolean =>
    image.includes('data:image') ? true : false;

  onSubmit(): void {
    if (this.textForm.valid) {
      this.sendDataFilter();
      this.textForm.reset();
    }
  }
  sendDataFilter(): void {}
  otherOnSubmit(): void {
    if (this.textForm.valid) {
      this.sendDataFilter();
      this.clearInput = true;
    }
  }
  clearFilterAction(): void {
    this.textForm.reset();
    this.clearInput = false;
  }

  largeModal(): void {
    this.isLarge = !this.isLarge;
  }

  asingSpormant(): void {
    if (this.sportSelect.length === 0) {
      return;
    }

    const requestAsing = {
      sportman: this.sportSelect,
      exercise: this.exerciesSelect,
    };

    this.ejercicioServices$.assignExercies(requestAsing).subscribe(
      (res) => {
        Toast.fire({
          icon: 'success',
          title: res.Message,
        });
      },
      (error) => {
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }
}
