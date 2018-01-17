import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {DataInladenComponent} from './dataInladen/dataInladen.component';
import {MenuComponent} from './menu/menu.component';
import {Routing} from './app.routes';
import {HomeComponent} from "./home/home.component";
import {DataService} from "./data.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataInladenComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Routing
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
