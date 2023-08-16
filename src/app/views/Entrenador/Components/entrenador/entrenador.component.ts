import { ChangeDetectionStrategy, Component } from '@angular/core';
import { columnsEntrenadorValue } from 'src/app/views/Entrenador/Model/columnDataEntrenador';

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.scss'],
})
export class EntrenadorComponent {
  public column = columnsEntrenadorValue;
  public data = [];
  public  isCheck:boolean = true;
  constructor() {}


}
