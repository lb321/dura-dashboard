import {RouterModule, Routes} from '@angular/router';
import {DataInladenComponent} from './dataInladen/dataInladen.component';
import {HomeComponent} from './home/home.component';
import {ChartComponent} from "./chart/chart.component";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'datainladen', component: DataInladenComponent},
  { path: 'grafiek', component: ChartComponent}
];

export const appRoutingProviders: any[] = [

];

export const Routing = RouterModule.forRoot(appRoutes);
