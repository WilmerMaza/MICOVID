import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Entrandor, viewModalEntrenador } from '../../Model/entrenadorModel';
import { DateValidators, Validators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-viewEntrenador',
  templateUrl: './viewEntrenador.component.html',
  styleUrls: ['./viewEntrenador.component.scss'],
})
export class ViewEntrenadorComponent {
  @Input('viewActive') set setView(value: viewModalEntrenador) {
    const { data ,isVisible} = value;
    this.showViewEntrenador = isVisible;

    if (!Validators.isNullOrUndefined(data)) {
      this.dataEntrenador = data;

      const {birtDate ,stateordepartmen, city, nationality} = data
      this.dataSingle = {
        ...data,
        birtDate: DateValidators.parseDate(birtDate),
        nationality: `${nationality}, ${city} (${stateordepartmen})`,
      };
    }

  }

  @Output() editarEntrenadorView = new EventEmitter<Entrandor>();
  public showViewEntrenador: Boolean  | undefined = false;
  public dataSingle: Entrandor;
  private dataEntrenador: Entrandor;
  constructor() {}

  closeCard(): void {
    this.showViewEntrenador = false;
  }

  editarEntrenador(): void {
    this.editarEntrenadorView.emit(this.dataEntrenador)
  }
}
