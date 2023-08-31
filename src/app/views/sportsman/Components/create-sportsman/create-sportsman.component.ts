import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sportsmanFormModel } from '../../../models/sportsmanFormModel'
import { genero, identificación } from '../../../models/constSportsman'
import { FormGroup } from '@angular/forms';
import { ControlItem, SportsmanData } from '../../../models/dataFilterSportsman'
import Swal from 'sweetalert2';
import { SportsmanService } from '../../services/sportsman.service';

@Component({
  selector: 'app-create-sportsman',
  templateUrl: './create-sportsman.component.html',
  styleUrls: ['./create-sportsman.component.scss']
})
export class CreateSportsmanComponent implements OnInit {
  @Input('viewActive') set setView(value: any) {
    this.showViewSportsman = value.isVisible;
  }
  @Input('dataCategory') set dataCategory(value: any) {
    this.dataCreateSportsman = value;
  }
  @Output() CreateSportsman = new EventEmitter<any>();
  public dataCreateSportsman: any;
  public showViewSportsman: Boolean = true;
  public currentPage: number = 0;
  public sportsmansForm: FormGroup = new sportsmanFormModel().formsportsman();
  public categorias: ControlItem[];
  public generos: string[];
  public typeIdentification: string[];

  constructor(
    private sporsmanService$: SportsmanService,
  ) { }
  ngOnInit() {
    debugger
    this.categorias = this.dataCreateSportsman.find((item: SportsmanData) => item.property === 'category')?.control || [];
    this.generos = genero;
    this.typeIdentification = identificación
  }
  closeCard() {
    this.showViewSportsman = false;
  }

  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  createSportsman(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    
    debugger
    const formSportsman = {      
      ...this.sportsmansForm.value,
      image: 'default.png',
      category: this.sportsmansForm.value.category.name,
      CategoriumID: this.sportsmansForm.value.category.code
    };
    this.sporsmanService$.createSportsman(formSportsman).subscribe(
      async (res) => {
        await Toast.fire({
          icon: 'success',
          title: `${res.Menssage}`,
        });
        this.sportsmansForm.reset();
        this.currentPage = 0;
        this.CreateSportsman.emit(true);

      },
      (respError): void => {
        const { error } = respError;
        Toast.fire({
          icon: 'error',
          title: error,
        });
      }
    );
  }
}
