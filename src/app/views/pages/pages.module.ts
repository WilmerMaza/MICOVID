import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/components/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';  // Asegúrate de tener esta importación
import { PlansComponent } from './plans/components/plans.component';
import { NgxMaskModule } from 'ngx-mask';
import { PortalEntradaComponent } from './portal-entrada/portal-entrada.component';
import { BannerComponent } from './portal-entrada/banner/banner.component';
import { FooterComponent } from './portal-entrada/footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    PlansComponent,
    PortalEntradaComponent,
    BannerComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    PlansComponent
  ]
})
export class PagesModule {
}
