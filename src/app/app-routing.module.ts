import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {SeaportsTableComponent} from './seaports-table/seaports-table.component';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'seaport', component: SeaportsTableComponent},
  { path: 'map', component: MapComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: 'seaport' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
