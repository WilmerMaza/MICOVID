import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { entrenadorFormModel } from 'src/app/views/Entrenador/Model/entrenadorFormModel';
import { EntrenadorServices } from '../../services/EntrenadorServices.service';
import { CryptoService } from 'src/app/utils/crypto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createEntrenador',
  templateUrl: './createEntrenador.component.html',
  styleUrls: ['./createEntrenador.component.scss'],
})
export class CreateEntrenadorComponent implements OnInit {
  @Input('viewActive') set setView(value: any) {
    this.showViewEntrenador = value.isVisible;
  }
  @Output() CreateEntrenador = new EventEmitter<any>();

  public showViewEntrenador: Boolean = true;
  public currentPage: number = 0;
  public entrenadorForm: FormGroup = new entrenadorFormModel().formEntrenador();
  private cryptoService$ = new CryptoService();

  constructor(private entrenadorServices$: EntrenadorServices) {}

  ngOnInit() {}
  closeCard() {
    this.showViewEntrenador = false;
  }

  setCurrentPageR(): void {
    this.currentPage = this.currentPage + 1;
  }

  setCurrentPageL(): void {
    this.currentPage = this.currentPage - 1;
  }
  createEntrenador(): void {
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

    const encryptedData = this.cryptoService$
      .Encript(this.entrenadorForm.get('password')?.value)
      .toString();
    const formEntrenador = {
      ...this.entrenadorForm.value,
      password: encryptedData,
    };
    this.entrenadorServices$.createEntrenador(formEntrenador).subscribe(
      async (res) => {
        await Toast.fire({
          icon: 'success',
          title: `${res.Menssage}`,
        });
        this.entrenadorForm.reset();
        this.currentPage = 0;
        this.CreateEntrenador.emit(true);

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
