import { Component } from '@angular/core';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { JsonDataItem, DynamicObject, filterResult } from '../../shared/model/filterModel'

@Component({
  templateUrl: './athletes.component.html',
  styleUrls: ['./athletes.component.scss']
})
export class AthletesComponent {

  isCheck = true
  selectItemCount:number=0;
  nameAdd:string='deportista'

  columnsValue = [
    {
      displayname: 'position',
      name:'position',
      estado: true
    },
    {
      displayname: 'nombre completo',
      name:'name',
      estado: true
    },
    {
      displayname: 'weight',
      name:'weight',
      estado: true
    },
    {
      displayname: 'symbol',
      name:'symbol',
      estado: true
    },
    {
      displayname:'acción',
      estado:true,
      menu:[
        {action:'ver', text:'Ver'},
        {action:'Editar', text:'Editar'}
      ]
    }
  ]

  data = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    // {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    // {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    // {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    // {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    // {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ]

  isDownload = this.data.length !== 0;

  getActionEvent($event: ActionResponse): void{
    console.log($event)
  }

  getselectItemCount($event: number):void{
    this.selectItemCount = $event;
  }

  getDataFilter(event: filterResult):void {
    console.log(event)
  }

  jsonData = [
    {
      title:'Categoria',
      property: 'category',
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'Pony', value:'pony', code:''},
        {name:'Prejuvenil', value:'prejuvenil', code:''},
        {name:'Juvenil', value:'juvenil', code:''},
        {name:'Profesional', value: 'profesional', code:''}
      ]
    },{
      title:'Genero',
      property: 'genero',
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'Femenino', value:'Femenino', code:''},
        {name:'Masculino', value:'Masculino', code:''}
      ]
    },
    {
      title:'Tipo de identificación',
      property: 'identificacion' ,
      disable:false,
      isOpen:false,
      typeFilter:"check",
      control:[
        {name:'T. de Identidad', value:'TI', code:''},
        {name:'C. de Ciudadania', value:'CC', code:''}
      ]
    }
  ]
}
