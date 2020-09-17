import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdivinaElNumeroComponent } from './adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './agilidad-aritmetica/agilidad-aritmetica.component';
import { GamesComponent } from './layout-components/games/games.component';
import { PiedraPapelTijeraComponent } from './piedra-papel-tijera/piedra-papel-tijera.component';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  // {path: 'login', component: LoginComponent},
  // {path: 'calc', component: CalcComponent },
  // {path: 'calc', component: CalcComponent },
  // {path: 'countries', component: CountriesListComponent},
  // {path: '', component: WelcomeComponent},
  {path: 'piedra-papel-tijera', component: PiedraPapelTijeraComponent},
  {path: 'adivina-el-numero', component: AdivinaElNumeroComponent},
  {path: 'games', component: GamesComponent},
  {path: 'agilidad-aritmetica', component: AgilidadAritmeticaComponent},
  {path: 'about-me', component: AboutMeComponent},
  // {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
