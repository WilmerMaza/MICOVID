import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { SportsmanService } from 'src/app/views/sportsman/services/sportsman.service';
import { Sportsman } from 'src/app/views/models/DataSportsman';
import { Toast } from 'src/app/utils/alert_Toast';
import { IndicatorModel, indicatorsFormModel, levelList, listSportMan, templateList } from '../../Model/modelIndicators'
import { responseModel } from '../../Model/reponseModel';
import { Router } from '@angular/router';
import { Ejercicio } from '../../Model/ejercicioModel';
@Component({
  selector: 'app-indicador',
  templateUrl: './indicador.component.html',
  styleUrls: ['./indicador.component.scss']
})
export class IndicadorComponent implements OnInit, AfterContentInit {

  public render:boolean = false;
  public formIndicador : FormGroup = new indicatorsFormModel().formIndicators();
  public sportList : listSportMan[] = [];
  public levelsList  :levelList[] = [{level: 2 }, {level: 3 }, {level: 5}];
  public countTemplates: templateList[];
  public active: number = 0;
  public siguiente:boolean = false;
  public level : number = 0;

  constructor(
    private  ejercicioServices$: EjercicioServices, 
    private sporsmanService$: SportsmanService,
    private router: Router
  ){}

  ngOnInit():void{
    this.getSportMan();
  }

  ngAfterContentInit(): void {
    this.render = true;
  }

  getSportMan():void{
    this.sporsmanService$.getSportsman().subscribe((res: Sportsman[]) => {
      res.forEach((item: Sportsman) => {
        this.sportList.push({name: item.name, ID: item.ID})
      })
    })
  }

  createTemplate(level: number):void {
    this.countTemplates = new Array(level);
    this.level = level;
    this.siguiente = true;
  }

  changeTab():void{
    if(this.formIndicador.get("nameLevel")?.valid && this.active !== this.level - 1){

      this.countTemplates[this.active] = {
        number: this.formIndicador.get("level")?.value,
        name: this.formIndicador.get("nameLevel")?.value,
        description: this.formIndicador.get("descriptionLevel")?.value
    };

    let plus = 1;

    if(this.level === 2) {
      plus = 4
    }
    if(this.level === 3){ 
      plus = 2
    }

    this.formIndicador.patchValue({level: this.formIndicador.get("level")?.value + plus, nameLevel: "", descriptionLevel: ""});

    this.active++;
    }
  }

  isTheSame(tab: number): boolean{
    return tab <= this.active;
  }

  createIndicator(): void{

    if(this.active !== this.level - 1 || this.formIndicador.get("nameLevel")?.invalid){
      return;
    }

    this.countTemplates[this.active] = {
      number: this.formIndicador.get("level")?.value,
      name: this.formIndicador.get("nameLevel")?.value,
      description: this.formIndicador.get("descriptionLevel")?.value
    };
    
    let indicatoRequest: IndicatorModel = {
      name : this.formIndicador.get("name")?.value,
      description : this.formIndicador.get("description")?.value,
      levelCal : this.formIndicador.get("levelCal")?.value,
      absolute: this.formIndicador.get("absolute")?.value,
      sportman: this.formIndicador.get("sportman")?.value,
      levelList: this.countTemplates,
      exercisesList: this.ejercicioServices$.getExercisesList().map((data: Ejercicio) => data.ID),
      abrev:this.formIndicador.get("abrevt")?.value
    }

    this.ejercicioServices$.CreateIndicators(indicatoRequest).subscribe((data: responseModel) => {
      if(data.success){
        this.ejercicioServices$.setExercisesList([]);
        Toast.fire({
          icon: 'success',
          title: data.msg
        })
        this.goBackSuccess();
      }
    }, (error) => {
      Toast.fire({
        icon: 'error',
        title: error
      })
      
    })
    
  }

  goBackSuccess():void{
    this.router.navigate(["/Ejercicios"])
  }

  goBack():void {
    window.history.back();
  }
}
