import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { filterResult } from 'src/app/shared/model/filterModel';
import {
  DateValidators,
  NormaliceUpperUnicosValidators
} from 'src/app/utils/Validators';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { gender } from '../Entrenador/Model/constantesEntrenador';
import { listInfo } from '../Entrenador/Model/entrenadorModel';
import { Sportsman } from '../models/DataSportsman';
import { HistorialCategory, visible } from '../models/HistorialCategoryModel';
import { categoryModel } from '../models/categoryModel';
import { columnsValue } from '../models/columnDataSportman';
import { SportsmanData, jsonData } from '../models/dataFilterSportsman';
import { Error } from '../models/errorsModel';
import { SportsmanService } from './services/sportsman.service';

@Component({
  selector: 'app-sportsman',
  templateUrl: './sportsman.component.html',
  styleUrls: ['./sportsman.component.scss'],
})
export class SportsmanComponent implements OnInit {
  public dataSportman: Sportsman[] = [];
  public data = columnsValue;
  public jsonFilter = jsonData;
  public showSportsman: Boolean = false;
  public dataSingle: Sportsman;
  public dataSingleAux: Sportsman;
  public isCheck = true;
  public selectItemCount: number = 0;
  public historyCategory: HistorialCategory[];
  public dataCreateSportsman: SportsmanData[];
  public showViewCreateSportsman: visible;
  public fechaFormateada: string;
  public birdData: string;
  public generos: listInfo[];
  public selectedImageURL: string = '';
  public isDownload: boolean;
  public nameAdd: string = 'deportista';

  constructor(
    private sporsmanService$: SportsmanService,
    private router: Router,
    private imagenFuntionsService$: ImagenFuntionsService
  ) {}

  ngOnInit(): void {
    this.generos = gender;
    this.getSportsman();
    this.getCategory();
    this.actionShowSportmanByIndicator();
  }

  calculateCirclePosition(index: number): number {
    const circleSpacing = 100; // Ajusta el espaciado entre círculos
    return index * circleSpacing;
  }

  getCategory(): void {
    this.sporsmanService$.getAllCategory().subscribe((res: categoryModel[]) => {
      const categoriaIndex = jsonData.findIndex(
        (section) => section.title === 'Categoria'
      );
      // Si se encuentra la sección "Categoria"
      if (categoriaIndex !== -1) {
        jsonData[categoriaIndex].control = res.map((item) => ({
          name: item.name,
          value: item.name,
          code: item.ID,
        }));
      }
    });

    this.dataCreateSportsman = this.jsonFilter;
  }

  getSportsman(): void {
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      res.forEach((item: Sportsman) => {
        item.name = NormaliceUpperUnicosValidators.normaliceData(item.name);
        item.gender = NormaliceUpperUnicosValidators.normaliceData(item.gender);
        item.typeIdentification = item.typeIdentification.toLocaleUpperCase();
      });
      this.transformGenre(res);
    });
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg && nameImg !== 'Default.png') {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, (imageUrl) => {
        this.selectedImageURL = imageUrl;
      });
    }
  }

  getActionEvent(event: ActionResponse): void {
    const {
      action: { action },
      data: { birtDate },
      data,
    } = event;

    if (action === 'verDeportista') {
      this.birdData = DateValidators.parseDate(birtDate);
      const generoItem = this.generos.find(
        (generoSet: listInfo) => generoSet.code === data.gender
      );
      if (generoItem) {
        data.gender = generoItem.value;
      }

      this.viewImage(data.image);
      this.showSportsman = true;
      this.dataSingle = data;
      this.historyCategorico(data);
    }
    if (event.action === 'add') {
      this.showViewCreateSportsman = { isVisible: true };
    }
    if (action === 'Editar') {
      this.transformGenreInversa(data);
      this.showSportsman = false;
      this.showViewCreateSportsman = {
        isVisible: true,
        data: this.dataSingleAux,
      };
    }

    if (action === 'verIndicadores') {
      this.router.navigate(['sportsman/view'], {
        queryParams: { id: data.ID },
      });
    }
  }

  transformGenre(data: Sportsman[]): void {
    this.dataSportman = data.map((item: Sportsman) => {
      const generoItem = this.generos.find(
        (generoSet: listInfo) => generoSet.code === item.gender
      );
      if (generoItem) {
        item.gender = generoItem.value;
      }
      return item;
    });
  }

  transformGenreInversa(data: Sportsman): void {
    const generoItem = this.generos.find(
      (generoSet: listInfo) => generoSet.value === data.gender
    );

    if (generoItem) {
      data.gender = generoItem.code;
    }
    this.dataSingleAux = data;
  }

  reloadData(): void {
    this.getSportsman();
  }

  editSportman(): void {
    const event = {
      action: {
        action: 'Editar',
      },
      data: this.dataSingle, // Aquí debes proporcionar los datos adecuados
    };

    this.getActionEvent(event);
  }

  historyCategorico(data: Sportsman): void {
    const idObject = {
      id: data.ID, // Aquí asigna el valor de tu variable "id"
    };
    this.sporsmanService$.getHistoryCategory(idObject).subscribe(
      (res: HistorialCategory[]) => {
        this.historyCategory = res;
        this.historyCategory.forEach((item) => {
          // Transforma FechaInicio
          const fechaInicio = new Date(item.FechaInicio);
          item.FechaInicio = fechaInicio.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD

          // Transforma FechaFin
          const fechaFin = new Date(item.FechaFin);
          item.FechaFin = fechaFin.toISOString().split('T')[0]; // Obtén el formato YYYY-MM-DD
        });
      },
      (error) => {
        if (error.status === 404) {
          this.historyCategory = []; // Asignar un vector vacío si no se encontraron deportistas
        }
      }
    );
  }

  closeCard(): void {
    this.showSportsman = false;
  }
  getselectItemCount($event: number): void {
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult): void {
    event.jsonData.forEach((item) => {
      if (!item.disable) {
        event.filterData[item.property] = [];
      }
    });
    this.sporsmanService$.getSFilterSportsman(event.filterData).subscribe(
      (res: Sportsman[]) => {
        this.transformGenre(res); // Asignar el resultado a dataSportman
      },
      (error: Error) => {
        if (error.status === 404) {
          this.dataSportman = []; // Asignar un vector vacío si no se encontraron deportistas
        }
      }
    );
  }

  actionShowSportmanByIndicator(): void {
    const dataSportman = [...this.sporsmanService$.getSportmanInfoRedirect()];
    if (dataSportman.length > 0) {
      const data = dataSportman[0];
      const { birtDate } = data;
      this.birdData = DateValidators.parseDate(birtDate);
      const generoItem = this.generos.find(
        (generoSet: listInfo) => generoSet.code === data.gender
      );
      if (generoItem) {
        data.gender = generoItem.value;
      }

      this.viewImage(data.image);
      this.showSportsman = true;
      this.dataSingle = data;
      this.historyCategorico(data);
    }
  }
}
