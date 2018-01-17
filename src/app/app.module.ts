import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DataInladenComponent} from './dataInladen/dataInladen.component';
import {MenuComponent} from './menu/menu.component';
import {Routing} from './app.routes';
import {HomeComponent} from "./home/home.component";
import {DataService} from "./data.service";
import {FormsModule} from "@angular/forms";
import { ChartModule } from 'angular-highcharts';
import {ChartComponent} from "./chart/chart.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataInladenComponent,
    MenuComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    ChartModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
