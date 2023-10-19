import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular';
import { NavItem } from './_nav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import { DataUser } from 'src/app/views/pages/model/dataUserModel';
import { NormaliceUpperUnicosValidators } from 'src/app/utils/Validators';
import { ImagenFuntionsService } from 'src/app/services/imagen-funtions.service';
import { ImageLoader } from 'src/app/utils/readerBlodImg';

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

      this.viewImage(image);
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
