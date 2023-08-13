import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatAccordion, MatExpansionPanel} from '@angular/material/expansion';
import { JsonDataItem, DynamicObject, filterResult, ControlItem } from '../model/filterModel'
import { ActionResponse } from '../model/Response/DefaultResponse';
import { regExps } from 'src/app/utils/Validators';

@Component({
  selector: 'app-dinamic-filter',
  templateUrl: './dinamic-filter.component.html',
  styleUrls: ['./dinamic-filter.component.scss']
})
export class DinamicFilterComponent {
  public textForm: FormGroup;
  public isImperfection:boolean =false;
  public showFilter:boolean = false;
  public jsonData: JsonDataItem[] = [];

  @ViewChild(MatAccordion)
  acc!: MatAccordion;
  @ViewChild(MatExpansionPanel) pannel?: MatExpansionPanel; 
  
  @Input('selectItemCount') selectItemCount = 0; 
  @Input('isDownload') isDownload = false;
  @Input('nameAdd') nameAdd = '';
  @Input('dataFilter') set setDataFilter(value : JsonDataItem[]) {
    this.jsonData = value;
  }

  @Output() filterResult = new EventEmitter<filterResult>();
  @Output() actionFilter = new EventEmitter<ActionResponse>();

  constructor(private formBuilder: FormBuilder) {
    this.textForm = this.formBuilder.group({
      textInput: ['', Validators.pattern(regExps['special'])],
    });
  }

  onSubmit(): void {
    this.isImperfection = true;
    if (this.textForm.valid) {
      this.sendDataFilter();
      this.textForm.reset();
    }
  }

  showFilterToggle():void {
    this.showFilter = !this.showFilter
  }


  enableSlideToggle(event: any, item: JsonDataItem):void {
    event.stopPropagation();
    item.isOpen = item.disable;
  }

  sendDataFilter():void{
    const { value: {textInput} } = this.textForm;
    const dataResponseFilter:DynamicObject<any> = {};
    const data = textInput;
    dataResponseFilter['Name'] = data;
    this.jsonData.forEach((data: JsonDataItem) => {
      const arrayFilters: string[]=[];
      const isChecked = data.control.filter((a: ControlItem) => a.code).length;

      data.control.forEach((control: ControlItem) => {
        if(control.code || isChecked == 0 || !data.disable) {
          arrayFilters.push(control.value);
        }
      })
      dataResponseFilter[data.property] = arrayFilters;
    } )

    const dataFinal: filterResult = {
      jsonData : this.jsonData,
      filterData: dataResponseFilter
    }
    this.filterResult.emit(dataFinal);
    this.showFilter = false;
  }

  clearItemFilter(item: JsonDataItem): void{
    item.control.forEach((elem:ControlItem) => {
        if(elem.code) elem.code = '';
    });
  }

  clearAllFilters(): void{
    this.jsonData.forEach((data: JsonDataItem) => {
      data.control.forEach((elem: ControlItem) => {
        if(elem.code) elem.code = '';
      });
    })
  }

  actionClick(data: string): void {
    let dataActionResponse:ActionResponse  = {action: data, data};
    this.actionFilter.emit(dataActionResponse);
  }

}

