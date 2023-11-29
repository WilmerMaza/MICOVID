import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { AuthService } from 'src/app/services/auth-service.service';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { NormaliceUpperUnicosValidators } from 'src/app/utils/Validators';
import { ImageLoader } from 'src/app/utils/readerBlodImg';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { NavItem } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {
  private itemsNavigate = new NavItem();
  public navItems: INavData[];
  public userName: string;
  public imageUrl: string = '';
  constructor(
    private router: Router,
    private service$: AuthService,
    private imagenFuntionsService$: ImagenFuntionsService
  ) {}

  ngOnInit(): void {
    const { ItemsInstitution, ItemsCoach } = this.itemsNavigate;
    this.service$.getDataUser.subscribe((data: DataUser) => {
      const { account, name, institutionName, image } = data;
      this.navItems = account === 'Admin' ? ItemsInstitution : ItemsCoach;
      this.userName = NormaliceUpperUnicosValidators.normaliceData(
        account === 'Admin' ? institutionName : name
      );
      if (image !== 'defaul.png') {
        this.viewImage(image);
      }
    });
  }

  viewImage(nameImg: string | undefined): void {
    if (nameImg) {
      const imageLoader = new ImageLoader(this.imagenFuntionsService$);
      imageLoader.loadImage(nameImg, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
    }
  }
}
