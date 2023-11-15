import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EjercicioServices } from '../../views/Ejercicios/services/ejercicioServices.service';

@Injectable({
  providedIn: 'root',
})
export class IndicatorsGuard {
  constructor(private router: Router, private  ejercicioServices$: EjercicioServices) {}
  canActivate(): boolean {
    if (!this.ejercicioServices$.getExercisesList().length) {
      this.router.navigate(['/Ejercicios']);
      return false;
    } else {
      return true;
    }
  }
}
