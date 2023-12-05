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
  public imageDefault: string = 'imagen.jpg';
  constructor(
    private imagenFuntionsService$: ImagenFuntionsService) {}

  @Input('dataSource') set setDataSource(data: viewEjercicio) {
    this.data = data;
    this.initCarousel = data.dataEjercicio.findIndex(
      (obj) => obj.ID === data.data.ID
    );
  }

    ngOnInit(): void {
      this.initData();
      this.viewImage();
    }

    initData(): void {
      const { dataEjercicio, data  } = this.data
      this.initCarousel =  dataEjercicio.findIndex(obj => obj.ID === data.ID);
      this.dataEjercicios = dataEjercicio;
    }



  @Output() actionClose = new EventEmitter<boolean>();

    async viewImage(): Promise<void> {
      const imagePromises: Promise<void>[] = [];
    
      this.data.dataEjercicio.forEach((ejercicio: Ejercicio, index: number) => {
        const { VisualIllustration } = ejercicio;
        if (VisualIllustration !== this.imageDefault && VisualIllustration) {
          const imageLoader = new ImageLoader(this.imagenFuntionsService$);
          const imagePromise = new Promise<void>((resolve) => {
            imageLoader.loadImage(VisualIllustration, (imageUrl) => {
              this.imageUrl[index] = imageUrl;
              resolve();
            });
          });
          imagePromises.push(imagePromise);
        } else {
          this.imageUrl[index] = this.imageDefault; // Usar el índice directamente
        }
      });
    
      // Esperar a que se completen todas las promesas de carga de imágenes
      await Promise.all(imagePromises);
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
