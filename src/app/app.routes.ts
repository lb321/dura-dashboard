import {RouterModule, Routes} from '@angular/router';
import {DataInladenComponent} from './dataInladen/dataInladen.component';
import {HomeComponent} from './home/home.component';
import {ChartComponent} from "./chart/chart.component";
import {RondetijdComponent} from "./rondetijd/rondetijd.component";
import {Rondetijd2Component} from "./rondetijd2/rondetijd2.component";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'datainladen', component: DataInladenComponent},
  { path: 'grafiek', component: ChartComponent},
  { path: 'rondetijden', component: RondetijdComponent},
  { path: 'rondetijden2', component: Rondetijd2Component}

];

export const appRoutingProviders: any[] = [

];

export const Routing = RouterModule.forRoot(appRoutes);
