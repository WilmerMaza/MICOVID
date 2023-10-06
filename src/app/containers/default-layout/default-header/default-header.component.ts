import { Component, Input, OnInit } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth-service.service';
import { NormaliceUpperUnicosValidators, Validators } from 'src/app/utils/Validators';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { PlansService } from 'src/app/views/pages/plans/services/plans.service';
import { SessionService } from 'src/app/views/pages/services/session.service';
import { objectStikyUser, stiky } from '../../utilsLayout/constants'
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls:['./default-header.component.scss']
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public namePerson?: string = '';
  public stickyUser: stiky | undefined;
  public indicadoRuta:string;
  constructor(
    private classToggler: ClassToggleService,
    private session$: SessionService,
    private Auth$: AuthService,
    private router: Router
  ) {
    super();

    router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.indicadoRuta = this.transformindicador(router.url.split("?")[0]);
    });
  }

  transformindicador(key: string): string{
    let routeChild = key.split("/");
    let route = routeChild.length > 2 ? 
    NormaliceUpperUnicosValidators.normaliceData(routeChild[2]): 
    NormaliceUpperUnicosValidators.normaliceData(routeChild[1]);
    switch (route) {
      case "Sportsman":
        return "Deportista"
      case "Plan-anual":
        return "Plan anual"
      default:
        return route;
    }
  }

  ngOnInit(): void {
    this.personName();
  }

  personName(): void {
    this.Auth$.getDataUser.subscribe((res: DataUser) => {
      const { institutionName, name, account } = res;
      this.namePerson = Validators.isNullOrUndefined(institutionName)
        ? name
        : institutionName;

      this.stickyUser = objectStikyUser.find(data => data.roll === account);
    });

  }

  logout(): void {
    this.session$.logout();
  }
}
