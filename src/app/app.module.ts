import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/infraestructure/modules/material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgxMaskModule } from 'ngx-mask';
import { MAT_DATE_LOCALE } from '@angular/material/core'

// Import routing module
import { AppRoutingModule } from './app-routing.module';
// Import app component
import { AppComponent } from './app.component';
// Import containers
import {
  DefaultHeaderComponent,
  DefaultLayoutComponent,
} from './containers';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';
import { SportsmanComponent } from './views/sportsman/sportsman.component';
import { SharedModuleModule } from "./shared/shared-module.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateSportsmanComponent } from './views/sportsman/Components/create-sportsman/create-sportsman.component';
import { PagesModule } from './views/pages/pages.module'

const APP_CONTAINERS = [
  DefaultHeaderComponent,
  DefaultLayoutComponent,
];

@NgModule({
    declarations: [AppComponent, ...APP_CONTAINERS],
    providers: [
        LocalStorageService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy,
        },
        IconSetService,
        Title,
      { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        AvatarModule,
        BreadcrumbModule,
        FooterModule,
        DropdownModule,
        GridModule,
        HeaderModule,
        SidebarModule,
        IconModule,
        NavModule,
        ButtonModule,
        FormModule,
        UtilitiesModule,
        ButtonGroupModule,
        ReactiveFormsModule,
        SidebarModule,
        SharedModule,
        TabsModule,
        ListGroupModule,
        ProgressModule,
        BadgeModule,
        ListGroupModule,
        CardModule,
        NgScrollbarModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        SharedModuleModule,
        FlexLayoutModule,
        PagesModule,
        NgxMaskModule.forRoot()
    ]
})
export class AppModule {}
