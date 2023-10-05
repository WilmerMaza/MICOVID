import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavItem } from './_nav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { NormaliceUpperUnicosValidators } from 'src/app/utils/Validators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  private itemsNavigate = new NavItem();
  public navItems: INavData[];
  public userName: string;
  constructor(private router: Router, private service$: AuthService) {}

  ngOnInit(): void {
    const { ItemsInstitution, ItemsCoach } = this.itemsNavigate;
    this.service$.getDataUser.subscribe((data:DataUser) => {
      const { account, name, institutionName } = data;
      this.navItems = account === 'Admin'? ItemsInstitution : ItemsCoach;
      this.userName = NormaliceUpperUnicosValidators.normaliceData(account === 'Admin' ? institutionName : name);
    })
  }

}
