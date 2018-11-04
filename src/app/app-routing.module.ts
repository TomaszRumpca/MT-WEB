import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {SeaportsTableComponent} from './seaports-table/seaports-table.component';
import {MapComponent} from './map/map.component';
import {AuthGuardService} from './login/auth-guard.service';
import {MainNavComponent} from './main-nav/main-nav.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  // { path: 'seaport', component: SeaportsTableComponent, canActivate: [AuthGuardService], outlet: 'sidenav'},
  // { path: 'map', component: MapComponent, canActivate: [AuthGuardService], outlet: 'sidenav'},
  {
    path: '',
    component: MainNavComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: SeaportsTableComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'seaport',
        component: SeaportsTableComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'map',
        component: MapComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  // {path: '**', redirectTo: 'home', canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
