import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
} from '@angular/material';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';
import {SeaportsTableComponent} from './seaports-table/seaports-table.component';
import {MainNavComponent} from './main-nav/main-nav.component';
import {SeaportService} from './seaport.service';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SeaportsTableComponent,
    MainNavComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AgmCoreModule.forRoot({
      // apiKey: 'AIzaSyBkqeT1Cw4I_IO8hMX8F-i0OJAcTaVQbok'
      apiKey: 'AIzaSyDCKYgsbrTnuVLhkdloGxHeaAnjvvAF2Rw'
    }),
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule {
}
