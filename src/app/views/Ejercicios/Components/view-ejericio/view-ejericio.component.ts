import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { viewEjercicio } from '../../Model/ejercicioModel';
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from 'swiper';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);
@Component({
  selector: 'app-view-ejericio',
  templateUrl: './view-ejericio.component.html',
  styleUrls: ['./view-ejericio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewEjericioComponent {
  public showFullDescription: boolean = false;
  public maxLength: number = 150;
  public initCarousel: number;
  public data: viewEjercicio;
  public zoomImage: boolean = false;
  public index: number = 0;

  constructor() {}

  @Input('dataSource') set setDataSource(data: viewEjercicio) {
    this.data = data;
    this.initCarousel = data.dataEjercicio.findIndex(
      (obj) => obj.ID === data.data.ID
    );
  }

  @Output() actionClose = new EventEmitter<boolean>();

  toggleDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }

  cerrar(): void {
    this.actionClose.emit(true);
  }

  abrirImagen(index: number): void {
    this.zoomImage = !this.zoomImage;
    this.index = index;
  }
}
