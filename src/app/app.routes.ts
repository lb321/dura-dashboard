import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {DataInladenComponent} from './dataInladen/dataInladen.component';
import {HomeComponent} from './home/home.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'datainladen', component: DataInladenComponent}
];

export const appRoutingProviders: any[] = [

];

export const Routing = RouterModule.forRoot(appRoutes);
