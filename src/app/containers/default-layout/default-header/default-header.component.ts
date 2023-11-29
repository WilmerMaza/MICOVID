import { Component, Input, OnInit } from '@angular/core';

import { NavigationEnd, Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service.service';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import {
  NormaliceUpperUnicosValidators,
  Validators,
} from 'src/app/utils/Validators';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { SessionService } from 'src/app/views/pages/services/session.service';
import { objectStikyUser, stiky } from '../../utilsLayout/constants';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public namePerson?: string = '';
  public stickyUser: stiky | undefined;
  public indicadoRuta: string;
  public sesicion: boolean = false;
  public selectedImageURL: string = '';
  constructor(
    private classToggler: ClassToggleService,
    private session$: SessionService,
    private Auth$: AuthService,
    private router: Router,
    private imagenFuntionsService$: ImagenFuntionsService
  ) {
    super();

    router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.indicadoRuta = this.transformindicador(router.url.split('?')[0]);
      });
  }

  personSesicion(): void {
    this.sesicion = this.sesicion ? false : true;
  }

  transformindicador(key: string): string {
    let routeChild = key.split('/');
    let route =
      routeChild.length > 2
        ? NormaliceUpperUnicosValidators.normaliceData(routeChild[2])
        : NormaliceUpperUnicosValidators.normaliceData(routeChild[1]);
    switch (route) {
      case 'Sportsman':
      case 'View':
        return 'Deportista';
      case 'Plan-anual':
        return 'Plan anual';
      default:
        return route;
    }
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, (imageUrl) => {
        this.selectedImageURL = imageUrl;
      });
    }
  }

  ngOnInit(): void {
    this.personName();
  }

  personName(): void {
    this.Auth$.getDataUser.subscribe((res: DataUser) => {
      const { institutionName, name, account, image } = res;
      this.namePerson = Validators.isNullOrUndefined(institutionName)
        ? name
        : institutionName;

      this.stickyUser = objectStikyUser.find((data) => data.roll === account);
      if (image !== 'defaul.png') {
        this.viewImage(image);
      }
    });
  }

  logout(): void {
    this.session$.logout();
  }
}
