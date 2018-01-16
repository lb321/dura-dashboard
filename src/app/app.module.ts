import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DataInladenComponent} from './dataInladen/dataInladen.component';
import {MenuComponent} from './menu/menu.component';
import {Routing} from './app.routes';
import {HomeComponent} from "./home/home.component";
import {DataService} from "./data.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataInladenComponent,
    MenuComponent,
    HttpClientModule
  ],
  imports: [
    BrowserModule,
    Routing
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
