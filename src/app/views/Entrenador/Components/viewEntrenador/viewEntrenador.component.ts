import { Component, Input, OnInit } from '@angular/core';
import { Entrandor } from '../../Model/entrenadorModel';

@Component({
  selector: 'app-viewEntrenador',
  templateUrl: './viewEntrenador.component.html',
  styleUrls: ['./viewEntrenador.component.scss']
})
export class ViewEntrenadorComponent implements OnInit {
  @Input('viewActive') set setView(value: any){
    this.dataSingle = value.data;
    this.showViewEntrenador = value.isVisible;
  }
  public showViewEntrenador: Boolean = false;
  public dataSingle:Entrandor;
  constructor() { }

  ngOnInit() {
  }

  closeCard(){
    this.showViewEntrenador = false;
  }

}
