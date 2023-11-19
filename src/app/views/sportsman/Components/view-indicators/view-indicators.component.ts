import { Component, OnInit } from '@angular/core';
import { SportsmanService } from '../../services/sportsman.service';
import { ActivatedRoute } from '@angular/router';
import { DataIndicators, SportsMan, columnsIndValue } from '../../Models/indicatorsModel';
import { Ejercicio } from 'src/app/views/Ejercicios/Model/ejercicioModel';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';

@Component({
  selector: 'app-view-indicators',
  templateUrl: './view-indicators.component.html',
  styleUrls: ['./view-indicators.component.scss']
})
export class ViewIndicatorsComponent implements OnInit {
  private routeId: string;
  public columns  = columnsIndValue;
  public dataEjerc: Ejercicio[];
  public dataSportman:SportsMan;
  public imageUrl: string = '';
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

    this.getDataIndicators();
  }

  getDataIndicators(): void{
    this.service$.getAlldataIndicators(this.routeId).subscribe((data:DataIndicators) => {
      let dataSourse:Ejercicio[] = [];
      data.item.forEach((item) => {
        const { Ejercicio : { SubGrupo}} = item
        item.Ejercicio.SubGrupoAbbreviation = SubGrupo.abreviatura;
        item.Ejercicio.GrupoAbbreviation = SubGrupo.Grupo.Abbreviation;
        dataSourse.push(item.Ejercicio);
        this.dataSportman = item.SportsMan;
      })
      this.viewImage(this.dataSportman.image);
      this.dataEjerc = dataSourse
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

  goBack(): void{
    window.history.back();
  }

}