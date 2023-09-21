import { Component, Input, OnInit } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth-service.service';
import { Validators } from 'src/app/utils/Validators';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { PlansService } from 'src/app/views/pages/plans/services/plans.service';
import { SessionService } from 'src/app/views/pages/services/session.service';
import { objectStikyUser, stiky } from '../../utilsLayout/constants'
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
  constructor(
    private classToggler: ClassToggleService,
    private session$: SessionService,
    private Auth$: AuthService,
  ) {
    super();
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
