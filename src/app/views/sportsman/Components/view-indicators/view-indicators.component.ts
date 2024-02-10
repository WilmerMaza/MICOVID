import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { Sportsman } from 'src/app/views/models/DataSportsman';
import SwiperCore, { EffectCoverflow, Navigation, Pagination } from 'swiper';
import {
  EjercicioIndicadores,
  Item,
  ItemAssing,
  Level,
  columnsIndValue,
  responseAssing,
} from '../../Models/indicatorsModel';
import { SportsmanService } from '../../services/sportsman.service';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);
@Component({
  selector: 'app-view-indicators',
  templateUrl: './view-indicators.component.html',
  styleUrls: ['./view-indicators.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewIndicatorsComponent implements OnInit {
  public showModule: boolean = false;
  private routeId: string;
  public columns = columnsIndValue;
  public initCarousel: number = 1;
  public dataEjerc: EjercicioIndicadores[];
  public dataSportman: ItemAssing;
  public imageUrl: string = '';
  public level: Level[] = [];
  public niveles: Level[];
  public indicadores: Item[] = [];
  public showIndicators: Item[] = [];
  public showLevels: boolean = false;
  public nameEjerc: string;

  constructor(
    private service$: SportsmanService,
    private route$: ActivatedRoute,
    private imagenFuntionsService$: ImagenFuntionsService,
    private redirect$: Router
  ) {}

  ngOnInit(): void {
    const {
      snapshot: { queryParams },
    } = this.route$;
    this.routeId = queryParams['id'];

    this.getDataIndicators(this.routeId);
  }

  getDataIndicators(id: string): void {
    this.service$
      .getAlldataIndicators(id)
      .subscribe(({ item, item: { Ejercicios } }: responseAssing) => {
        this.dataSportman = item;
        Ejercicios.forEach((itemEjercicio: EjercicioIndicadores) => {
          const {
            Indicadores,
            SubGrupo,
            SubGrupo: { Grupo },
          } = itemEjercicio;
          itemEjercicio.SubGrupoAbbreviation = SubGrupo.abreviatura;
          itemEjercicio.GrupoAbbreviation = Grupo.Abbreviation;
          this.indicadores = this.indicadores.concat(Indicadores);
          this.showModule = true;
        });
        this.viewImage(this.dataSportman.image);
        this.dataEjerc = Ejercicios;
      });
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, false, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
    }
  }

  getActionEvent(event: ActionResponse): void {
    const { action, data } = event;

    if (action === 'ver indicador') {
      this.showIndicators = this.indicadores.filter(
        (item: Item) => item.EjercicioID === data.ID
      );
      this.nameEjerc = data.Name;
    }
  }

  goBack(): void {
    window.history.back();
  }

  cerrar(): void {
    this.showIndicators = [];
    this.indicadores = [];
    this.getDataIndicators(this.routeId);
  }

  relativo(items: string): number {
    const totalAbsolute = this.showIndicators.reduce(
      (total: number, valor: Item) => {
        const absolutePercentage = Number.parseInt(valor.AbsolutePercentage);

        if (!isNaN(absolutePercentage)) {
          return total + absolutePercentage;
        }

        return total;
      },
      0
    );

    const valorRelativo: number = Number(
      ((Number.parseInt(items) / totalAbsolute) * 100).toFixed(1)
    );

    return valorRelativo;
  }

  showLevelsFunction(name: string, levels: Level[]): void {
    this.niveles = levels;
    this.nameEjerc = name;
    this.showLevels = true;
  }

  outLevel(): void {
    this.showLevels = false;
  }

  actionFunction(): void {
    const sportmanData: Sportsman = {
      ...this.dataSportman,
      sportInstition: '',
    };
    this.service$.setSportmanInfoRedirect(sportmanData);

    this.redirect$.navigate(['/sportsman']);
  }
}
