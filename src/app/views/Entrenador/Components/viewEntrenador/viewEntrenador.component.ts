import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entrandor, viewModalEntrenador } from '../../Model/entrenadorModel';
import { DateValidators, Validators } from 'src/app/utils/Validators';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
@Component({
  selector: 'app-viewEntrenador',
  templateUrl: './viewEntrenador.component.html',
  styleUrls: ['./viewEntrenador.component.scss'],
})
export class ViewEntrenadorComponent {
  @Input('viewActive') set setView(value: viewModalEntrenador) {
    const { data, isVisible } = value;
    this.imageUrl = '';
    this.showViewEntrenador = isVisible;

    if (!Validators.isNullOrUndefined(data)) {
      this.dataEntrenador = data;

      const { birtDate, stateordepartmen, city, nationality, image } = data;
      this.dataSingle = {
        ...data,
        birtDate: DateValidators.parseDate(birtDate),
        nationality: `${nationality}, ${city} (${stateordepartmen})`,
      };
      this.viewImage(image);
    }
  }

  @Output() editarEntrenadorView = new EventEmitter<Entrandor>();
  public showViewEntrenador: Boolean | undefined = false;
  public dataSingle: Entrandor;
  private dataEntrenador: Entrandor;
  public imageUrl: string = '';
  constructor(private imagenFuntionsService$: ImagenFuntionsService) {}

  closeCard(): void {
    this.imageUrl = '';
    this.showViewEntrenador = false;
  }

  editarEntrenador(): void {
    this.editarEntrenadorView.emit(this.dataEntrenador);
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, (imageUrl) => {

        this.imageUrl = imageUrl;
      });

    }
  }
}
