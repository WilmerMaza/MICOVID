import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/components/register.component';
import { JwtGuard } from './infraestructure/guard/JwtGuard';
import { PlanGuard } from './infraestructure/guard/PlanGuard';
import { IgnoreLoginGuard } from './infraestructure/guard/ignoreLoginGuard';
import { PlansComponent } from './views/pages/plans/components/plans.component';
import { SportsmanComponent } from './views/sportsman/sportsman.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [JwtGuard, PlanGuard],
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'athletes',
        loadChildren: () =>
          import('./views/athletes/athletes.module').then(
            (m) => m.AthletesModule
          ),
      },
      {
        path: 'sportsman',
        component: SportsmanComponent,
      },
      {
        path: 'Entrenador',
        loadChildren: () =>
          import('./views/Entrenador/Entrenador.module').then(
            (m) => m.EntrenadorModule
          ),
      },
      {
        path: 'plan-anual',
        loadChildren: () =>
          import('./views/annual-plan/annual-plan.module').then(
            (m) => m.AnnualPlanModule
          ),
      },
    ],
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404',
    },
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500',
    },
  },
  {
    path:'',
    canActivate: [IgnoreLoginGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page',
        },
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Register Page',
        },
      }
    ]
  },
  {
    path: 'plans',
    component: PlansComponent,
    data: {
      title: 'Plans Page',
    },
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
      // relativeLinkResolution: 'legacy'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
