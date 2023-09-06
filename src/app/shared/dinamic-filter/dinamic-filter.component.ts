import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion, MatExpansionPanel } from '@angular/material/expansion';
import {
  JsonDataItem,
  DynamicObject,
  filterResult,
  ControlItem,
} from '../model/filterModel';
import { ActionResponse } from '../model/Response/DefaultResponse';
import { regExps } from 'src/app/utils/Validators';

@Component({
  selector: 'app-dinamic-filter',
  templateUrl: './dinamic-filter.component.html',
  styleUrls: ['./dinamic-filter.component.scss'],
})
export class DinamicFilterComponent {
  public textForm: FormGroup;
  public showFilter: boolean = false;
  public jsonData: JsonDataItem[] = [];
  public clearInput : boolean = false;

  @ViewChild(MatAccordion)
  acc!: MatAccordion;
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel;

  @Input('selectItemCount') selectItemCount = 0;
  @Input('isDownload') isDownload = false;
  @Input('nameAdd') nameAdd = '';
  @Input('dataFilter') set setDataFilter(value: JsonDataItem[]) {
    this.jsonData = value;
  }
  @Input('showDownload') showDownload = true;
  @Input("showSelection") showSelection = true;
  @Input('showButtonAdd') showButtonAdd = true;
  @Input('showLateralPanel') showLateralPanel = true;

  @Output() filterResult = new EventEmitter<filterResult>();
  @Output() actionFilter = new EventEmitter<ActionResponse>();

  constructor(private formBuilder: FormBuilder) {
    this.textForm = this.formBuilder.group({
      textInput: ['', Validators.pattern(regExps['special'])],
    });
  }

  onSubmit(): void {
    if (this.textForm.valid) {
      this.sendDataFilter();
      this.textForm.reset();
    }
  }

  otherOnSubmit():void{
    if (this.textForm.valid) {
      this.sendDataFilter();
      this.clearInput = true;
    }
  }

  clearFilterAction():void{
    this.textForm.reset();
    this.actionClick('clearFilter');
    this.clearInput = false;
  }

  showFilterToggle(): void {
    this.showFilter = !this.showFilter;
  }

  enableSlideToggle(event: any, item: JsonDataItem): void {
    event.stopPropagation();
    item.isOpen = item.disable;
  }

  sendDataFilter(): void {
    const {
      value: { textInput },
    } = this.textForm;
    const dataResponseFilter: DynamicObject<any> = {};
    const data = textInput;
    dataResponseFilter['Name'] = data;
    this.jsonData.forEach((data: JsonDataItem) => {
      const arrayFilters: string[] = [];

      if (data.typeFilter === 'check') {
        const isChecked = data.control.filter(
          (a: ControlItem) => a.code
        ).length;

        data.control.forEach((control: ControlItem) => {
          if (control.code || isChecked == 0 || !data.disable) {
            arrayFilters.push(control.value);
          }
        });
      }

      dataResponseFilter[data.property] =
        data.typeFilter === 'input' ? data.control[0].value : arrayFilters;
    });

    const dataFinal: filterResult = {
      jsonData: this.jsonData,
      filterData: dataResponseFilter,
    };
    this.filterResult.emit(dataFinal);
    this.showFilter = false;
  }

  clearItemFilter(item: JsonDataItem): void {
    item.control.forEach((elem: ControlItem) => {
      if (elem.code) elem.code = '';
      if(elem.value) elem.value ='';
    });
  }

  clearAllFilters(): void {
    this.jsonData.forEach((data: JsonDataItem) => {
      if (data.typeFilter === 'check') {
        data.control.forEach((elem: ControlItem) => {
          if (elem.code) elem.code = '';
        });
      }
      if (data.typeFilter === 'input') {
        data.control[0].value = '';
      }
    });
  }

  actionClick(data: string): void {
    let dataActionResponse: ActionResponse = { action: data, data };
    this.actionFilter.emit(dataActionResponse);
  }
}
