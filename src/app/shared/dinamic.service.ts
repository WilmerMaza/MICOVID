import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinamicService {

  private dataToPass = new BehaviorSubject<boolean>(false);
  dataToPass$ = this.dataToPass.asObservable();

  private selectNumber = new BehaviorSubject<number>(0);
  selectNumber$ = this.selectNumber.asObservable();

  setData(data: boolean) {
    this.dataToPass.next(data);
  }

  setDataSelectNumber(data: number) {
    this.selectNumber.next(data);
  }

}
