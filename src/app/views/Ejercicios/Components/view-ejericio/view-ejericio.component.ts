import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Ejercicio, viewEjercicio } from '../../Model/ejercicioModel';
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from 'swiper';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EjercicioServices } from '../../services/ejercicioServices.service';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ImageLoader } from 'src/app/utils/readerBlodImg';

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
  public imageUrl: string[] = [];
  public dataEjercicios: Ejercicio[];
  constructor(
    private imagenFuntionsService$: ImagenFuntionsService) {}

  @Input('dataSource') set setDataSource(data: viewEjercicio) {
    this.data = data;
    this.initCarousel = data.dataEjercicio.findIndex(
      (obj) => obj.ID === data.data.ID
    );
  }

    ngOnInit(): void {
      this.initCarousel = this.data.dataEjercicio.findIndex(obj => obj.ID === this.data.data.ID);
       this.dataEjercicios =this.data.dataEjercicio;
      this.viewImage();
    }



  @Output() actionClose = new EventEmitter<boolean>();

    viewImage(): void {
      let count = 0;
      this.data.dataEjercicio.map((ejercicio: Ejercicio) =>{        
        const { VisualIllustration } = ejercicio
        if ( VisualIllustration != 'imagen.jpg' && VisualIllustration) {
          const imageLoader = new ImageLoader(this.imagenFuntionsService$);
          imageLoader.loadImage(VisualIllustration, (imageUrl) => {
            this.dataEjercicios[count].VisualIllustration = imageUrl;
          })
        }
        count++;   
      })
    }  

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
