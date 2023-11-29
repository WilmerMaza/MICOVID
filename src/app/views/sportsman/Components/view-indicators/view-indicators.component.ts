import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SportsmanService } from '../../services/sportsman.service';
import { ActivatedRoute } from '@angular/router';
import { DataIndicators, Item, Level, SportsMan, columnsIndValue } from '../../Models/indicatorsModel';
import { Ejercicio } from 'src/app/views/Ejercicios/Model/ejercicioModel';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ActionResponse } from 'src/app/shared/model/Response/DefaultResponse';
import SwiperCore, { Navigation, Pagination, EffectCoverflow } from 'swiper';


SwiperCore.use([Navigation, Pagination, EffectCoverflow]);
@Component({
  selector: 'app-view-indicators',
  templateUrl: './view-indicators.component.html',
  styleUrls: ['./view-indicators.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ViewIndicatorsComponent implements OnInit {
  private routeId: string;
  public columns  = columnsIndValue;
  public initCarousel: number = 1;
  public dataEjerc: Ejercicio[];
  public dataSportman:SportsMan;
  public imageUrl: string = '';
  public level: Level[] = [];
  public niveles: Level[];
  public indicadores : Item[] = [];
  public showIndicators: Item[] = [];
  public showLevels:boolean = false;
  public nameEjerc: string;

  constructor(
    private service$: SportsmanService,
    private route$: ActivatedRoute,
    private imagenFuntionsService$: ImagenFuntionsService
    ){}

  ngOnInit(): void {
    const {
      snapshot: { queryParams },
    } = this.route$;
    this.routeId = queryParams['id'];

    this.getDataIndicators(this.routeId);
  }

  getDataIndicators(id: string): void{
    this.service$.getAlldataIndicators(id).subscribe((data:DataIndicators) => {
      let dataSourse:Ejercicio[] = [];
      data.item.forEach((item: Item) => {
        const { Ejercicio : { SubGrupo}} = item;
        this.indicadores.push(item);
        item.Ejercicio.SubGrupoAbbreviation = SubGrupo.abreviatura;
        item.Ejercicio.GrupoAbbreviation = SubGrupo.Grupo.Abbreviation;
        item.Ejercicio.Indicador = item.ID;
        dataSourse.push(item.Ejercicio);
        this.dataSportman = item.SportsMan;
        this.level.push(...item.Levels);
      })
      this.viewImage(this.dataSportman.image);
      this.dataEjerc = dataSourse.reduce((acc: Ejercicio[], current: Ejercicio) => {
          if(!acc.some((obj:Ejercicio) => obj.ID === current.ID)){
              acc.push(current);
          }
          return acc
      }, [])
      
    })
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, (imageUrl) => {

        this.imageUrl = imageUrl;
      });

    }
  }

  getActionEvent(event: ActionResponse): void{
    const { action, data } = event;

    if(action === "ver indicador"){
        this.showIndicators = this.indicadores.filter((item: Item) => item.EjercicioID === data.ID);
        this.nameEjerc = data.Name
    }
    
  }

  goBack(): void{
    window.history.back();
  }

  cerrar(): void{
    this.showIndicators = [];
    this.indicadores = [];
    this.getDataIndicators(this.routeId);
    
  }

  showLevelsFunction(name:string, levels: Level[]):void{
    this.niveles = levels;
    this.nameEjerc = name;
    this.showLevels = true;
  }

  outLevel():void{
    this.showLevels = false;
  }

}