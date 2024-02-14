import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DinamicService, dataToPass } from '../dinamic.service';
import { ActionResponse } from '../model/Response/DefaultResponse';

@Component({
  selector: 'app-dinamic-table',
  templateUrl: './dinamic-table.component.html',
  styleUrls: ['./dinamic-table.component.scss'],
})
export class DinamicTableComponent implements AfterViewInit {
  public length = 50;
  public pageSize = 10;
  public pageIndex = 0;
  public pageSizeOptions = [5, 10, 25];
  public minWidth = '950px';
  public hidePageSize = false;
  public showPageSizeOptions = true;
  public showFirstLastButtons = true;
  public disabled = false;
  public noneData = 'No hay registros para mostrar.';
  public displayedColumns: any[] = [];
  public columnsToDisplay: string[] = [];
  public dataSource = new MatTableDataSource<any>([]);
  public selection = new SelectionModel<any>(true, []);
  public indexSubMenu: number = 0;

  @Input('isCheckBox') isCheckBox = false;
  @Input('isPaginador') isPaginador = true;
  @Input('editComplement') editComplement = false;
  m: any;
  @Input('columns') set setColumns(value: any[]) {
    this.displayedColumns = value;
    this.setColumn();
  }

  @Input('dataSource') set setDataSource(value: any[]) {
    this.dataSource.data = value;
  }

  @Output() actionEvent = new EventEmitter<ActionResponse>();
  pageEvent: PageEvent | undefined;

  constructor(private service$: DinamicService) {
    this.service$.dataToPass$.subscribe((data: dataToPass) => {
      if (data.isEspecial) {
        this.dataAction(data.eventName, this.selection.selected);
      }
    });
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit(): void {
    if (this.isPaginador) {
      this.paginator._intl.itemsPerPageLabel = 'Resultados por pagina';
      this.dataSource.paginator = this.paginator;
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    var countSelect = this.selection.selected.length;
    this.service$.setDataSelectNumber(countSelect);
    const numSelected = countSelect;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  handlePageEvent(e: PageEvent): void {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  setColumn(): void {
    this.columnsToDisplay = this.displayedColumns
      .filter((c) => c.estado)
      .map((c) => c.displayname);
    if (this.isCheckBox) {
      this.columnsToDisplay.unshift('select');
    }
  }

  dataAction(action: any, row: any): void {
    const actionReturn: ActionResponse = {
      action,
      data: row,
    };
    this.actionEvent.emit(actionReturn);
  }

  dataActionCheck(action: any): void {
    const actionReturn: ActionResponse = {
      action: { action: 'Select' },
      data: this.selection.selected,
    };
    this.actionEvent.emit(actionReturn);
  }

  mouseOver(index: number): void {
    this.indexSubMenu = index;
  }
}
