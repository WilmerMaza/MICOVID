import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  dinamicTableComplements
} from 'src/app/views/annual-plan/models/interfaceFormPlan';
import { columnsDefault, columnsSubgrupo } from '../../model/columnDataTable';

@Component({
  selector: 'app-view-table',
  templateUrl: './viewTable.component.html',
  styleUrls: ['./viewTable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewTableComponent implements OnInit {
  public titleInit: string = '';
  public column = [{}];
  public dataSet = [{}];
  public modalName: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: dinamicTableComplements
  ) {}
  ngOnInit(): void {
    this.typeTable();
  }

  typeTable(): void {
    const { name, data } = this.data;
    this.titleInit = `${name} exisitentes`;
    this.modalName = name;
    this.columnaTable(name);
    this.dataSet = data;
  }

  columnaTable(name: string): void {
    switch (name) {
      case 'Categorías':
        this.column = columnsDefault;
        break;
      case 'Etapas':
        this.column = columnsDefault;
        break;
      case 'Tareas':
        this.column = columnsDefault;
        break;
      case 'Subgrupos':
        this.column = columnsSubgrupo;
        break;
      default:
        break;
    }
  }
}
