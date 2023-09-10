import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavItem } from './_nav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  private itemsNavigate = new NavItem();
  public navItems: INavData[];

  constructor(private router: Router, private service$: AuthService) {}

  ngOnInit(): void {
    const { ItemsInstitution, ItemsCoach } = this.itemsNavigate;
    this.service$.getDataUser.subscribe((data:DataUser) => {
      const { account } = data;
      this.navItems = account === 'Admin'? ItemsInstitution : ItemsCoach
    })
  }

  goRouter(item: INavData){
    this.router.navigate([item.url]);
  }
}
