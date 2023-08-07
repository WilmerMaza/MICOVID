import { Component, Input, OnInit } from '@angular/core';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { SessionService } from 'src/app/views/pages/services/session.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public namePerson?: string = '';
  private  dataUser: DataUser = {} as DataUser;

  constructor(
    private classToggler: ClassToggleService,
    private session$: SessionService,
    private Auth$: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.personName();
  }

  personName(): void {
    this.Auth$.getDataUser.subscribe((res: DataUser) => {
      this.dataUser = res;
    });

    const {institutionName}= this.dataUser;
    this.namePerson = institutionName;
  }

  logout(): void {
    this.session$.logout();
  }
}
